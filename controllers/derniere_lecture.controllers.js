/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable camelcase */
const db = require('../models');
const http = require('../common/http');
const validate = require('../common/common');
const { SUCCESS, VALIDATE_ERROR, INTERNAL_SERVER_ERROR, ERROR } = require('../common/constant');

const Dernierelectures = db.dernierelectures;

exports.get_dernierelectures = (req, res) => {
  const limit = 10;
  const offset = 0 + ((req.query.page || 1) - 1) * limit;
  Dernierelectures.findAll({ offset, limit })
    .then((dernierelectures) => {
      http.send(req, res, SUCCESS, dernierelectures);
    })
    .catch((err) => {
      console.log(err);
      http.send(req, res, ERROR, err);
    });
};

exports.get_dernierelecture = (req, res) => {
  const req_body = {
    user_id: req.query.user_id,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Dernierelectures.findOne({ where: { id: req_body.user_id } })
          .then((dernierelecture) => {
            http.send(req, res, SUCCESS, dernierelecture);
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

// Create and Save a new Dernierelecture
exports.create_dernierelecture = (req, res) => {
  const req_body = {
    user_id: req.body.user_id,
    livre_id: req.body.livre_id,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Dernierelectures.create(req_body)
          .then((data) => {
            http.send(req, res, SUCCESS, data);
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              message: err.message || 'Some error occurred while creating the Dernierelecture.',
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
  // Save Dernierelecture in database
};

// Find a single Dernierelecture with an id
exports.findById = (req, res) => {
  const req_body = {
    user_id: req.query.user_id,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Dernierelectures.findByPk(req_body.user_id)
          .then((dernierelecture) => {
            http.send(req, res, SUCCESS, dernierelecture);
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

// Update a Dernierelecture by the id in the request
exports.update_dernierelecture = (req, res) => {
  const req_body = {
    user_id: req.body.user_id,
    ...req.body,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Dernierelectures.update(req_body, { where: { user_id: req_body.user_id } })
          .then((num) => {
            if (num === 1) {
              http.send(req, res, SUCCESS, {
                message: 'Dernierelecture was updated successfully.',
              });
            } else {
              http.send(req, res, ERROR, {
                message: `Cannot update Dernierelecture with user_id=${req_body.user_id}. Maybe Dernierelecture was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              message: `Error updating Dernierelecture with user_id=${req_body.user_id}`,
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

// Delete a Dernierelecture with the specified id in the request
exports.delete_dernierelecture = (req, res) => {
  const req_body = {
    user_id: req.query.user_id,
  };

  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Dernierelectures.destroy({ where: { user_id: req_body.user_id } })
          .then((num) => {
            if (num === 1) {
              http.send(req, res, SUCCESS, {
                message: 'Dernierelecture was deleted successfully!',
              });
            } else {
              http.send(req, res, ERROR, {
                message: `Cannot delete Dernierelecture with user_id=${req_body.user_id}. Maybe Dernierelecture was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              sage: `Error deleting Dernierelecture with user_id=${req_body.user_id}`,
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
