const express = require('express');

const router = express.Router();
const controller = require('../controllers/genre.controllers');

router.get('/all', controller.get_genres);
router.get('/genre', controller.get_genre);
router.post('/' , controller.create_genre);
router.delete('/' , controller.delete_genre);

module.exports = router;
