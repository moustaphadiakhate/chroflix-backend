const express = require('express');

const router = express.Router();
const controller = require('../controllers/notification.controllers');

router.get('/notification', controller.get_notification);
router.post('/', controller.create_notification);
router.patch('/', controller.update_notification);

module.exports = router;
