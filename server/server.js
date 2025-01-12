import express from "express";

import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
import uploadRoutes from "./routes/uploadRoute.js";
import queryRoutes from "./routes/queryRoute.js";
import attributeRoutes from "./routes/attributeRoute.js";
import authRoutes from "./routes/authroute.js";
import userRoutes from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminRoute.js";
const origin  = process.env.ALLOWED_ORIGIN || "http://localhost:3001";
const app = express();
app.use(cors({
  origin: origin,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use("/upload", uploadRoutes);
app.use("/query", queryRoutes);
app.use("/attributes", attributeRoutes);
app.use("/auth",authRoutes)
app.use("/user",userRoutes)
app.use("/admin",adminRoutes)

app.get("/", (req, res) => {
  res.send("Home Page");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
