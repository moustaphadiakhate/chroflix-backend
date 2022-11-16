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



exports.create_genre = (req, res) => {
  const req_body = {
    genre: req.body.genre,
    slug: req.body.slug,
    banaliser : req.body.banaliser,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Genres.create(req_body)
          .then((data) => {
            http.send(req, res, SUCCESS, data);
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              message: err.message || 'Some error occurred while creating the Genre.',
            });
          });
      } else {
        http.send(req, res, VALIDATE_ERROR, response);
      }
    })
    .catch((err) => {
      console.log(err);
      http.send(req, res, INTERNAL_SERVER_ERROR, err);
    });
  // Save Genres in database
};



exports.delete_genre = (req, res) => {
  const req_body = {
    id: req.query.id,
  };

  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Genres.destroy({ where: { id: req_body.id } })
          .then((num) => {
            if (num === 1) {
              http.send(req, res, SUCCESS, {
                message: 'Genres was deleted successfully!',
              });
            } else {
              http.send(req, res, ERROR, {
                message: `Cannot delete Genres with id=${req_body.id}. Maybe Genres was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              sage: `Error deleting Genres with id=${req_body.id}`,
            });
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