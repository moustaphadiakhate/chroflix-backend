/* eslint-disable camelcase */
const express = require('express');
const multer = require('../config/multer_config');


const router = express.Router();
const user_controller = require('../controllers/user.controllers');
const verify_token = require('../middlewares/verify_token');
const verify_access = require('../middlewares/user_access');
const brouillon_controller = require('../controllers/brouillon.controllers');
const chapitre_controller = require('../controllers/chapitre.controllers');
const livre_controller = require('../controllers/livre.controllers');
const bibliotheque_controller = require('../controllers/bibliotheque.controllers');
const notification_controller = require('../controllers/notification.controllers');
const upload = multer;


router.get('/all', user_controller.get_users);
router.get('/user', user_controller.get_user);

router.get('/my_bibliotheque', bibliotheque_controller.get_my_bibliotheque);
router.get('/my_notifications', notification_controller.get_my_notifications);
router.get('/my_livres', livre_controller.get_my_livres);

router.get('/livres', livre_controller.get_livres);

router.get('/livre', livre_controller.get_livre);
router.post('/livre', livre_controller.create_livre);
router.patch('/livre', livre_controller.update_livre);
router.delete('/livre', livre_controller.delete_livre);
router.post('/uploads',upload, user_controller.uploads);




router.get(
  '/chapitre',
  verify_token,
  verify_access.can_get_chapiter_or_brouillon,
  chapitre_controller.get_chapitre
);
router.post(
  '/chapitre',
  verify_token,
  verify_access.can_set_chapiter_or_brouillon,
  chapitre_controller.create_chapitre
);
router.patch(
  '/chapitre',
  verify_token,
  verify_access.can_set_chapiter_or_brouillon,
  chapitre_controller.update_chapitre
);
router.delete(
  '/chapitre',
  verify_token,
  verify_access.can_set_chapiter_or_brouillon,
  chapitre_controller.delete_chapitre
);

router.get(
  '/brouillon',
  verify_token,
  verify_access.can_get_chapiter_or_brouillon,
  brouillon_controller.get_brouillon
);
router.post(
  '/brouillon',
  verify_token,
  verify_access.can_set_chapiter_or_brouillon,
  brouillon_controller.create_brouillon
);
router.patch(
  '/brouillon',
  verify_token,
  verify_access.can_set_chapiter_or_brouillon,
  brouillon_controller.update_brouillon
);
router.delete(
  '/brouillon',
  verify_token,
  verify_access.can_set_chapiter_or_brouillon,
  brouillon_controller.delete_brouillon
);

module.exports = router;
