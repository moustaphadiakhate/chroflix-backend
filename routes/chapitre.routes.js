const express = require('express');

const router = express.Router();
const controller = require('../controllers/chapitre.controllers');

router.get('/all', controller.get_chapitres);
router.get('/chapitre', controller.get_chapitre);
router.post('/', controller.create_chapitre);
router.patch('/', controller.update_chapitre);
router.delete('/', controller.delete_chapitre);

module.exports = router;
