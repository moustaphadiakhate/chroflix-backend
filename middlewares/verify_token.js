const jwt = require('jsonwebtoken');
const config = require('../config');
const http = require('../common/http');
const { TOKEN_ERROR } = require('../common/constant');

module.exports = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.authorization;
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.auth.secret, (err, decoded) => {
      if (err) {
        http.send(req, res, TOKEN_ERROR, { message: 'Unauthorized access.' });
      }
      req.chroflix_user = decoded;
      next();
    });
  } else {
    http.send(req, res, TOKEN_ERROR, { message: 'No token provided.' });
  }
};
