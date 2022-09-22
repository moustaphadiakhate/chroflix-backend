const express = require('express');

const router = express.Router();
const controller = require('../controllers/derniere_lecture.controllers');

router.get('/all', controller.get_dernierelectures);
router.get('/user', controller.get_dernierelecture);
router.post('/', controller.create_dernierelecture);
router.patch('/', controller.update_dernierelecture);
router.delete('/', controller.delete_dernierelecture);

module.exports = router;
