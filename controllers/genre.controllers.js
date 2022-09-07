/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable camelcase */
const db = require('../models');
const http = require('../common/http');
const validate = require('../common/common');
const { SUCCESS, VALIDATE_ERROR, INTERNAL_SERVER_ERROR, ERROR } = require('../common/constant');

const Genres = db.genres;

exports.get_genres = (req, res) => {
  const limit = 10;
  const offset = 0 + ((req.query.page || 1) - 1) * limit;
  Genres.findAll({ offset, limit })
    .then((genres) => {
      http.send(req, res, SUCCESS, genres);
    })
    .catch((err) => {
      console.log(err);
      http.send(req, res, ERROR, err);
    });
};

exports.get_genre = (req, res) => {
  const req_body = {
    id: req.query.id,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Genres.findOne({ where: { id: req_body.id } })
          .then((genre) => {
            http.send(req, res, SUCCESS, genre);
          })
          .catch((err) => {
            console.log(err);
            http.send(req, res, ERROR, err);
          });
      } else {
        http.send(req, res, VALIDATE_ERROR, response);
      }
    })
    .catch((err) => {
      console.log(err);
      http.send(req, res, INTERNAL_SERVER_ERROR, err);
    });
};
