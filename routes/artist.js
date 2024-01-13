import { Router } from 'express';
import ArtistController from '../controllers/artist.js';
import middlewares from '../middlewares/index.js';

const router = Router();

// router.get('/', ArtistController.routeTest);
router.post('/', middlewares.auth, ArtistController.saveArtist);

export default router;
