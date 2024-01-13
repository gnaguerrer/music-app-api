import Artist from '../models/artist.js';

const saveArtist = async (req, res) => {
  const data = req.body;
  const artist = new Artist(data);
  try {
    const savedArtist = await artist.save();
    if (!savedArtist) {
      return res.status(400).json({
        error: true,
        message: 'Unable to create artist. Try it later',
        data: null
      });
    }
    return res.status(200).json({
      message: 'Artist created successfully',
      data: artist
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: 'Unable to create artist. Try it later',
      data: null
    });
  }
};

export default {
  saveArtist
};
