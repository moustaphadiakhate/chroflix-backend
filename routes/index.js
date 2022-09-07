const express = require('express');

const router = express.Router(); /* eslint-disable camelcase */
const auth_routes = require('./auth.routes');
const user_routes = require('./user.routes');
const auteur_routes = require('./auteur.routes');
const bibliotheque_routes = require('./bibliotheque.routes');
const brouillon_routes = require('./brouillon.routes');
const chapitre_routes = require('./chapitre.routes');
const derniere_lecture_routes = require('./derniere_lecture.routes');
const genre_routes = require('./genre.routes');
const menu_items_routes = require('./menu_items.routes');
const menu_routes = require('./menu.routes');
const notification_routes = require('./notification.routes');
const transaction_routes = require('./transaction.routes');
const livre_routes = require('./livre.routes');
// const nombre_vues_routes = require('./nombre_vue.routes');

router.use('/auth', auth_routes);
router.use('/users', user_routes);
router.use('/auteur', auteur_routes);
router.use('/bibliotheque', bibliotheque_routes);
router.use('/brouillon', brouillon_routes);
router.use('/chapitre', chapitre_routes);
router.use('/derniere_lecture', derniere_lecture_routes);
router.use('/genre', genre_routes);
router.use('/menu_items', menu_items_routes);
router.use('/menu', menu_routes);
router.use('/notification', notification_routes);
router.use('/transaction', transaction_routes);
router.use('/livre', livre_routes);
// router.use('nombre_vue',nombre_vues_routes);


module.exports = router;
