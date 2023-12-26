import { Router } from 'express';
import AlbumController from '../controllers/album.js';

const router = Router();

router.get('/', AlbumController.routeTest);

export default router;
