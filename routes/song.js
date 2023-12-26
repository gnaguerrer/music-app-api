import { Router } from 'express';
import SongController from '../controllers/song.js';

const router = Router();

router.get('/', SongController.routeTest);

export default router;
