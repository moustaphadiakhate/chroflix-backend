const express = require('express');

const router = express.Router();
const controller = require('../controllers/transaction.controllers');

router.get('/transaction', controller.get_transaction);
router.post('/', controller.create_transaction);
router.patch('/', controller.update_transaction);

module.exports = router;
