import express from 'express';
import { getTables } from '../controllers/userController.js';
import authMiddleware from '../middleware/authmiddleware.js';


const router = express.Router();

router.get('/tables', authMiddleware,getTables);

export default router;