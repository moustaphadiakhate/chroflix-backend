const express = require('express');

const router = express.Router();
const controller = require('../controllers/user.controllers');

router.get('/all', controller.get_users);
router.get('/user', controller.get_user);

// router.post('/user', controller.get_user); middleware  can accsess brouillons
// router.patch('/user', controller.get_user); middleware  can accsess brouillons
// router.delete('/user', controller.get_user); middleware  can accsess brouillons

// router.post('/user', controller.get_user); middleware  can accsess book
// router.patch('/user', controller.get_user); middleware  can accsess book
// router.delete('/user', controller.get_user); middleware  can accsess book

// router.post('/user', controller.get_user); middleware  can accsess chapitre
// router.patch('/user', controller.get_user); middleware  can accsess chapitre
// router.delete('/user', controller.get_user); middleware  can accsess chapitre

module.exports = router;
