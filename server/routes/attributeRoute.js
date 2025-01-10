import express from 'express';

import { getTableData } from '../controllers/attributeTable.js';

const router = express.Router();


// Route to handle file upload
// router.post('/',  getAttributes);
router.post('/table',  getTableData);

export default router;
