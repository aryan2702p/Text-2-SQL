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
    return res.status(400).json({ error: "Missing Fields" });
  }
  try {

    //console.log("signup data", req.body);
    // if (
    //   !isValidEmail(email) ||
    //   !isValidPassword(password) ||
    //   !isValidName(name)
    // ) {
    //   res.status(400).json({ error: "Invalid fields" });
    // }

    const hashedPassword = await bcrypt.hash(password, 5);

    const escapedEmail = Sqlstring.escape(email);
    const escapedPassword = Sqlstring.escape(hashedPassword);
    const escapedName = Sqlstring.escape(name);

    await db.run(
      `INSERT INTO Users (email, password,name) VALUES (${escapedEmail}, ${escapedPassword},${escapedName});`
    );

    const accessToken = generateAccessToken(escapedEmail);
   // const refreshToken = generateRefreshToken(email);

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: isProduction,
      maxAge: 3600000,
      sameSite: isProduction ? 'None' : 'Strict',
    });

    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   maxAge: 604800000,
    // });

    // Implement the signup logic here

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.log("error in signup", error);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {

    //console.log("login data", req.body);

    const escapedEmail = Sqlstring.escape(email);
    const result = await db.run(
      `SELECT password FROM Users WHERE email = ${escapedEmail}`
    );
    const rows = await result.getRows();
    if (rows.length === 0) {
      return res.status(400).json({ error: "Invalid email" });
    }
    
    //console.log("login rows", rows);
    const escapedPassword = Sqlstring.escape(password);
    
    //   todo test here
    const isSame = bcrypt.compare(escapedPassword, rows[0][0]);

    if (!isSame) {
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
