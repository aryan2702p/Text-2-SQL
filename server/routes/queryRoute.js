import express from 'express';

import { queryFile,runQuery } from '../controllers/queryController.js';

const router = express.Router();


// Route to handle file upload
router.post('/',  queryFile);
router.post('/runQuery',  runQuery);

export default router;
