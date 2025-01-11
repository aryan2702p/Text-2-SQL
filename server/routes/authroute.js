import express from 'express';

const router = express.Router();

import { login,googleLogin,googleCallBack,signup,logout } from '../controllers/authController.js';

router.post('/login', login);
router.post('/signup', signup);
router.get('/google', googleLogin);
router.get('/google/callback', googleCallBack);
router.get('/logout', logout);

export default router;