import express from "express";

import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
import uploadRoutes from "./routes/uploadRoute.js";
import queryRoutes from "./routes/queryRoute.js";
import attributeRoutes from "./routes/attributeRoute.js";
import authRoutes from "./routes/authroute.js";
import userRoutes from "./routes/userRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/upload", uploadRoutes);
app.use("/query", queryRoutes);
app.use("/attributes", attributeRoutes);
app.use("/auth",authRoutes)
app.use("/user",userRoutes)

app.get("/", (req, res) => {
  res.send("Home Page");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
