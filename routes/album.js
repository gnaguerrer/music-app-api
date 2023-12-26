const express = require('express');

const router = express.Router();
const AlbumController = require('../controllers/album');

router.get('/', AlbumController.routeTest);

module.exports = router;
