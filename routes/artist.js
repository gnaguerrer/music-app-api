const express = require('express');

const router = express.Router();
const ArtistController = require('../controllers/artist');

router.get('/', ArtistController.routeTest);

module.exports = router;
