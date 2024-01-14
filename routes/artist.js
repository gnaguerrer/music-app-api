import { Router } from 'express';
import ArtistController from '../controllers/artist.js';
import middlewares from '../middlewares/index.js';

const router = Router();

router.post('/', middlewares.auth, ArtistController.saveArtist);
router.get('/:id', middlewares.auth, ArtistController.getArtist);

export default router;
