import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function generateAccessToken(email) {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};




