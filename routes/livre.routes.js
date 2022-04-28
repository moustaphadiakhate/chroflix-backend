const express = require('express');

const router = express.Router();
const controller = require('../controllers/livre.controllers');

router.get('/all', controller.get_livres);
router.get('/livre', controller.get_livre);
router.post('/', controller.create_livre);
router.patch('/', controller.update_livre);
router.delete('/', controller.delete_livre);

module.exports = router;
