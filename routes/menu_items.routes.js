const express = require('express');

const router = express.Router();
const controller = require('../controllers/menu_item.controllers');

router.get('/all', controller.get_menu_items);
router.get('/genre', controller.get_menu_item);

module.exports = router;
