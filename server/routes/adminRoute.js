import express from 'express';
import { getAllTables, getAllUsers } from '../controllers/adminController.js';

const router = express.Router();

router.get('/tables' ,getAllTables);
router.get('/users',getAllUsers);

export default router;