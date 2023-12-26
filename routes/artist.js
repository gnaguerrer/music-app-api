import { Router } from 'express';
import ArtistController from '../controllers/artist.js';

const router = Router();

router.get('/', ArtistController.routeTest);

export default router;
