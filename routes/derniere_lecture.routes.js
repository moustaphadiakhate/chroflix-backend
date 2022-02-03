const express = require('express');

const router = express.Router();
const controller = require('../controllers/auteur.controllers');

router.get('/all', controller.get_auteurs);
router.get('/user', controller.get_auteur);
router.post('/', controller.create_auteur);
router.patch('/', controller.update_auteur);
router.delete('/', controller.delete_auteur);

module.exports = router;
