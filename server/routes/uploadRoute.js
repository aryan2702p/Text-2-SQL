import express from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/uploadController.js';
import authMiddleware  from '../middleware/authmiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Route to handle file upload
router.post('/', authMiddleware,upload.single('file'), uploadFile);

export default router;
