import express, { json, urlencoded } from 'express';
import cors from 'cors';
import db from './database/connection.js';
import UserRoutes from './routes/user.js';
import AlbumRoutes from './routes/album.js';
import ArtistRoutes from './routes/artist.js';
import SongRoutes from './routes/song.js';

db.connection();

const PORT = 3900;
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api/user', UserRoutes);
app.use('/api/album', AlbumRoutes);
app.use('/api/artist', ArtistRoutes);
app.use('/api/song', SongRoutes);

app.get('/', (_, res) => {
  return res.status(200).json({
    status: true,
    message: 'Connection successfully'
  });
});

app.listen(PORT);
