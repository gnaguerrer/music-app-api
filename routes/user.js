import { Router } from 'express';
import UserController from '../controllers/user.js';

const router = Router();

router.post('/signUp', UserController.signUp);

export default router;
