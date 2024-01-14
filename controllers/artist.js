import mongoose from 'mongoose';
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

const getArtist = async (req, res) => {
  const artistId = req.params?.id;
  if (!mongoose.isValidObjectId(artistId)) {
    return res.status(400).json({
      message: 'Invalid id',
      data: null,
      error: true
    });
  }
  try {
    const artist = await Artist.findById(artistId);
    if (artist) {
      return res.status(200).json({
        message: 'Artist found successfully',
        data: artist
      });
    }
    return res.status(404).json({
      error: true,
      message: 'Unable to find artist. Try it later',
      data: null
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: 'Unable to get artist. Try it later',
      data: null
    });
  }
};

export default {
  saveArtist,
  getArtist
};
