import { Router } from 'express';
import UserController from '../controllers/user.js';
import middlewares from '../middlewares/index.js';

const router = Router();

router.post('/signUp', UserController.signUp);
router.post('/login', UserController.login);
router.get('/profile/:profileId', middlewares.auth, UserController.getProfile);

export default router;
