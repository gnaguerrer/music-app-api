import { Router } from 'express';
import UserController from '../controllers/user.js';
import middlewares from '../middlewares/index.js';

const router = Router();

router.post('/signUp', UserController.signUp);
router.post('/login', UserController.login);
router.get('/profile/:profileId', middlewares.auth, UserController.getProfile);
router.put(
  '/profile/:profileId',
  middlewares.auth,
  UserController.updateProfile
);
router.put('/profile/', middlewares.auth, UserController.updateProfile);

export default router;
