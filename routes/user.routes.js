const express = require('express');

const router = express.Router();
const controller = require('../controllers/user.controller');

router.get('/all', controller.allAccess);
router.get('/user', controller.userBoard);

module.exports = router;
