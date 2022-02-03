/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable camelcase */
const db = require('../models');
const http = require('../common/http');
const validate = require('../common/common');
const { SUCCESS, VALIDATE_ERROR, INTERNAL_SERVER_ERROR, ERROR } = require('../common/constant');

const Menus = db.menus;

exports.get_menus = (req, res) => {
  Menus.findAll()
    .then((menus) => {
      http.send(req, res, SUCCESS, menus);
    })
    .catch((err) => {
      console.log(err);
      http.send(req, res, ERROR, err);
    });
};

exports.get_menu = (req, res) => {
  const req_body = {
    id: req.query.id,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Menus.findOne({
          where: {
            id: req_body.id,
          },
        })
          .then((menu) => {
            http.send(req, res, SUCCESS, menu);
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
