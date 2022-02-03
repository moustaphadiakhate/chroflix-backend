/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable camelcase */
const db = require('../models');
const http = require('../common/http');
const validate = require('../common/common');
const { SUCCESS, VALIDATE_ERROR, INTERNAL_SERVER_ERROR, ERROR } = require('../common/constant');

const Transactions = db.transactions;

exports.get_transaction = (req, res) => {
  const req_body = {
    id: req.query.id,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Transactions.findOne({
          where: {
            id: req_body.id,
          },
        })
          .then((transaction) => {
            http.send(req, res, SUCCESS, transaction);
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
//

// Create and Save a new Transaction
exports.create_transaction = (req, res) => {
  const req_body = {
    user_id: req.body.user_id,
    numero: req.body.numero,
    livre_id: req.body.livre_id,
    total: req.body.total,
    part_auteur: req.body.part_auteur,
    part_chroflix: req.body.part_chroflix,
    ...req.body,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Transactions.create(req_body)
          .then((data) => {
            http.send(req, res, SUCCESS, data);
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              message: err.message || 'Some error occurred while creating the Transaction.',
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
  // Save Transaction in database
};

// Update a Transaction by the id in the request
exports.update_transaction = (req, res) => {
  const req_body = {
    id: req.body.id,
    ...req.body,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Transactions.update(req_body, {
          where: { id: req_body.id },
        })
          .then((num) => {
            if (num === 1) {
              http.send(req, res, SUCCESS, {
                message: 'Transaction was updated successfully.',
              });
            } else {
              http.send(req, res, ERROR, {
                message: `Cannot update Transaction with id=${req_body.id}. Maybe Transaction was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              message: `Error updating Transaction with id=${req_body.id}`,
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
