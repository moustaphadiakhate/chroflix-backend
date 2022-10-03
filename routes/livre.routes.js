const express = require('express');
const multer = require('../config/multerLivre_config');

const router = express.Router();
const controller = require('../controllers/livre.controllers');
const upload = multer;

router.get('/all', controller.get_livres);
router.get('/livre', controller.get_livre);
router.post('/',upload, controller.create_livre);
router.patch('/', controller.update_livre);
router.delete('/', controller.delete_livre);

module.exports = router;
