import express from 'express';
import { userControllerRegister, userControllerLogin } from '../Controllers/UserController.js';

const router = express.Router();

router.post('/register', userControllerRegister);
router.post('/login', userControllerLogin);

export default router;