import express from 'express';
import { getTables } from '../controllers/userController.js';


const router = express.Router();

router.get('/tables', getTables);

export default router;