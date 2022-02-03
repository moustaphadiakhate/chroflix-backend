const express = require('express');

const router = express.Router(); /* eslint-disable camelcase */
const auth_routes = require('./auth.routes');
const user_routes = require('./user.routes');

router.use('/auth', auth_routes);
router.use('/users', user_routes);

module.exports = router;
