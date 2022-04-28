const express = require('express');

const router = express.Router();
const controller = require('../controllers/genre.controllers');

router.get('/all', controller.get_genres);
router.get('/genre', controller.get_genre);

module.exports = router;
