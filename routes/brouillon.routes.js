const express = require('express');

const router = express.Router();
const controller = require('../controllers/brouillon.controllers');

router.get('/all', controller.get_brouillons);
router.get('/brouillon', controller.get_brouillon);
router.post('/', controller.create_brouillon);
router.patch('/', controller.update_brouillon);
router.delete('/', controller.delete_brouillon);

module.exports = router;
