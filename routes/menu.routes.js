const express = require('express');

const router = express.Router();
const controller = require('../controllers/menu.controllers');

router.get('/all', controller.get_menus);
router.get('/menu', controller.get_menu);

module.exports = router;
