const { connection } = require('./database/connection');
const express = require('express');
const cors = require('cors');

connection();
const PORT = 3900;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const UserRoutes = require('./routes/user');
const AlbumRoutes = require('./routes/album');
const ArtistRoutes = require('./routes/artist');
const SongRoutes = require('./routes/song');

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
