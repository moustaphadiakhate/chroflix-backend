const express = require('express');

const router = express.Router();
const controller = require('../controllers/nombre_vue.controllers');

router.get('/', controller.get_nombre_vues);


module.exports = router;