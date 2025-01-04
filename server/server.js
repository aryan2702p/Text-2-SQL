
import express from 'express';
//import multer from 'multer';
// import { generateSQL } from './helpers/generateSQL.js';


import cors from 'cors';
import dotenv from 'dotenv';
//import path from 'path';

dotenv.config();
import uploadRoutes from './routes/uploadRoute.js';
import queryRoutes from './routes/queryRoute.js';
import attributeroutes from './routes/attributeRoute.js';

// Initialize Gemini

//console.log(process.env.GEMINI_API_KEY);


const app = express();
app.use(cors());
app.use(express.json());
app.use('/upload', uploadRoutes);
app.use('/query',queryRoutes);
app.use('/attributes',attributeroutes);


app.get('/', (req, res) => {
  res.send('Home Page');
});
// const upload = multer({ dest: 'uploads/' });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
