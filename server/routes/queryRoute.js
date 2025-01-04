import express from 'express';

import { queryFile } from '../controllers/queryController.js';

const router = express.Router();


// Route to handle file upload
router.post('/',  queryFile);

export default router;
