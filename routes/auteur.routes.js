const express = require('express');

const router = express.Router();
const controller = require('../controllers/auteur.controllers');

router.get('/all', controller.get_auteurs);
router.get('/auteur', controller.get_auteur);
router.get('/user_id', controller.get_auteur_user_id);
router.post('/', controller.create_auteur);
router.patch('/', controller.update_auteur);
router.delete('/', controller.delete_auteur);

module.exports = router;
