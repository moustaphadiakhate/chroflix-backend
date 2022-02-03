const express = require('express');

const router = express.Router();
const controller = require('../controllers/bibliotheque.controllers');

router.get('/all', controller.get_bibliotheques);
router.get('/bibliotheque', controller.get_bibliotheque);
router.post('/', controller.create_bibliotheque);
router.patch('/', controller.update_bibliotheque);
router.delete('/', controller.delete_bibliotheque);

module.exports = router;
