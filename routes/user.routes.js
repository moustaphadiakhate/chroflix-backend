/* eslint-disable camelcase */
const express = require('express');

const router = express.Router();
const user_controller = require('../controllers/user.controllers');
const brouillon_controller = require('../controllers/brouillon.controllers');
const chapitre_controller = require('../controllers/chapitre.controllers');
const livre_controller = require('../controllers/livre.controllers');
const bibliotheque_controller = require('../controllers/bibliotheque.controllers');
const notification_controller = require('../controllers/notification.controllers');

router.get('/all', user_controller.get_users);
router.get('/user', user_controller.get_user);
router.get('/my_bibliotheque', bibliotheque_controller.get_my_bibliotheque);
router.get('/notifications', notification_controller.get_my_notifications);

router.get('/chapitre', chapitre_controller.get_chapitre); // middleware  can accsess chapitres
router.post('/chapitre', chapitre_controller.create_chapitre); // middleware  can accsess chapitres
router.patch('/chapitre', chapitre_controller.update_chapitre); // middleware  can accsess chapitres
router.delete('/chapitre', chapitre_controller.delete_chapitre); // middleware  can accsess chapitres

router.get('/brouillon', brouillon_controller.get_brouillon); // middleware  can accsess brouillons
router.post('/brouillon', brouillon_controller.create_brouillon); // middleware  can accsess brouillons
router.patch('/brouillon', brouillon_controller.update_brouillon); // middleware  can accsess brouillons
router.delete('/brouillon', brouillon_controller.delete_brouillon); // middleware  can accsess brouillons

router.get('/livre', livre_controller.get_livre); // middleware  can accsess livres
router.post('/livre', livre_controller.create_livre); // middleware  can accsess livres
router.patch('/livre', livre_controller.update_livre); // middleware  can accsess livres
router.delete('/livre', livre_controller.delete_livre); // middleware  can accsess livres

module.exports = router;
