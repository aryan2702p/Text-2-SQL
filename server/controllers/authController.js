import bcrypt from "bcrypt";
import generateAccessToken from "../utils/generateToken.js"
import axios from "axios";
import db from "../db_config.js";
import Sqlstring from 'sqlstring';
import dotenv from 'dotenv';
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const clientRedirectUrl = process.env.CLIENT_REDIRECT_URI;


export const signup = async (req, res) => {
  const { email, password, name } = req.body;


  if (!email || !password || !name) {
    return res.status(400).json({ 
      error: "Email, password, and name are required" 
    });
  }


  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  if (!nameRegex.test(name.trim())) {
    return res.status(400).json({ 
      error: "Name must be 2-50 characters long and contain only letters and spaces" 
    });
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: "Invalid email format" 
    });
  }


  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ 
      error: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character" 
    });
  }

  try {
    
    const sanitizedEmail = email.toLowerCase().trim();
    const checkEmailQuery = `SELECT email FROM Users WHERE email = '${sanitizedEmail.replace(/'/g, "''")}'`;
    console.log("checkEmailQuery",checkEmailQuery);
    
    const emailCheck = await db.run(checkEmailQuery);
    const existingUser = await emailCheck.getRows();

    if (existingUser.length > 0) {
      return res.status(400).json({ 
        error: "Email already registered" 
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Sanitize name
    const sanitizedName = name.trim().replace(/'/g, "''");

    // Insert new user
    const insertQuery = `
      INSERT INTO Users (name, email, password) 
      VALUES (
        '${sanitizedName}',
        '${sanitizedEmail}',
        '${hashedPassword}'
        
      )
    `;

    await db.run(insertQuery);

    // Generate access token
    const accessToken = generateAccessToken(sanitizedEmail);

    // Set cookie
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: isProduction,
      maxAge: 3600000,
      sameSite: isProduction ? 'None' : 'Strict',
    });

    console.log("Signup successful");
    res.status(201).json({ 
      message: "Signup successful" 
    });

  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ 
      error: "Internal server error" 
    });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {

    
    const escapedEmail = Sqlstring.escape(email);
    const result = await db.run(
      `SELECT password FROM Users WHERE email = ${escapedEmail}`
    );
    const rows = await result.getRows();
    if (rows.length === 0) {
      console.log("no user found");

      return res.status(400).json({ error: "Invalid email" });
    }
    
    //console.log("login rows", rows);
    const escapedPassword = Sqlstring.escape(password);
    
    //   todo test here
    const isSame = bcrypt.compare(escapedPassword, rows[0][0]);

    if (!isSame) {
      console.log("invalid password");
      return res.status(400).json({ error: "Invalid password" });
    }

    const accessToken = generateAccessToken(escapedEmail);
   // const refreshToken = generateRefreshToken(email);
   //console.log("token",accessToken);

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: isProduction,
      maxAge: 3600000,
      sameSite: isProduction ? 'None' : 'Strict',
    });



    console.log("login successful");

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log("error in login", error);
    res.status(500).json({ error: error.message });
  }
};

// export default logout = async (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//     });
//     res.clearCookie("refreshToken", {
//       httpOnly: true,
//     });

//     res.status(200).json({ message: "User logged out successfully!" });
//   } catch (error) {
//     logger.error("Error during logout:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const googleLogin = async (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  
  // Redirect the user to Google's OAuth consent screen
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `scope=openid%20profile%20email&` +
    `access_type=offline&` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `redirect_uri=${redirectUri}`;

  res.redirect(googleAuthUrl);
};

export const googleCallBack = async (req, res) => {

    const { code } = req.query; // The authorization code from Google

  try {
    // Exchange the authorization code for an access token and ID token
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        code: code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      },
    });

    const { access_token, id_token } = tokenResponse.data;

    // Use the acc ess token to fetch user info from Google
    const userProfileResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = userProfileResponse.data;

    if(!user) {
      res.status(400).json({ success: false, message: 'OAuth authentication failed' });
    }
    const email = user.email;


    // const userExists = await db.run(`SELECT * FROM Users WHERE email = ${email}`);
    // const rows = await userExists.getRows();
    // if (rows.length === 0) {
    //   await db.run(`INSERT INTO Users (email) VALUES (${email});`);
    // }

    const accessToken=generateAccessToken(email);
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'None' : 'Strict',
      maxAge: 3600000,
    });
    console.log("redirect url", clientRedirectUrl);
    res.redirect(clientRedirectUrl);
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: 'OAuth authentication failed' });
  }

};   


export const logout = async (req, res) => {
  try {
    //console.log("logout");
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'None' : 'Strict',
    });
   

    res.status(200).json({ message: "User logged out successfully!" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
