import express from 'express';

import { getAttributes } from '../controllers/attributeTable.js';

const router = express.Router();


// Route to handle file upload
router.post('/',  getAttributes);

export default router;
