/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable camelcase */
const db = require('../models');
const http = require('../common/http');
const validate = require('../common/common');
const { SUCCESS, VALIDATE_ERROR, INTERNAL_SERVER_ERROR, ERROR } = require('../common/constant');

const Brouillons = db.brouillons;

exports.get_brouillons = (req, res) => {
  Brouillons.findAll()
    .then((brouillons) => {
      http.send(req, res, SUCCESS, brouillons);
    })
    .catch((err) => {
      console.log(err);
      http.send(req, res, ERROR, err);
    });
};

exports.get_brouillon = (req, res) => {
  const req_body = {
    id: req.query.id,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Brouillons.findOne({
          where: {
            id: req_body.id,
          },
        })
          .then((brouillon) => {
            http.send(req, res, SUCCESS, brouillon);
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

// Create and Save a new Brouillon
exports.create_brouillon = (req, res) => {
  const req_body = {
    ex_id: req.body.ex_id,
    livre_id: req.body.livre_id,
    titre: req.body.titre,
    contenu: req.body.contenu,
    banaliser: req.body.banaliser,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Brouillons.create(req_body)
          .then((data) => {
            http.send(req, res, SUCCESS, data);
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              message: err.message || 'Some error occurred while creating the Brouillon.',
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
  // Save Brouillon in database
};

// Find a single Brouillon with an id
exports.findById = (req, res) => {
  const req_body = {
    id: req.query.id,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Brouillons.findByPk(req_body.id)
          .then((brouillon) => {
            http.send(req, res, SUCCESS, brouillon);
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

// Update a Brouillon by the id in the request
exports.update_brouillon = (req, res) => {
  const req_body = {
    id: req.body.id,
    ...req.body,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Brouillons.update(req_body, {
          where: { id: req_body.id },
        })
          .then((num) => {
            if (num === 1) {
              http.send(req, res, SUCCESS, {
                message: 'Brouillon was updated successfully.',
              });
            } else {
              http.send(req, res, ERROR, {
                message: `Cannot update Brouillon with id=${req_body.id}. Maybe Brouillon was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              message: `Error updating Brouillon with id=${req_body.id}`,
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

// Delete a Brouillon with the specified id in the request
exports.delete_brouillon = (req, res) => {
  const req_body = {
    id: req.query.id,
  };

  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Brouillons.destroy({
          where: { id: req_body.id },
        })
          .then((num) => {
            if (num === 1) {
              http.send(req, res, SUCCESS, {
                message: 'Brouillon was deleted successfully!',
              });
            } else {
              http.send(req, res, ERROR, {
                message: `Cannot delete Brouillon with id=${req_body.id}. Maybe Brouillon was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              sage: `Error deleting Brouillon with id=${req_body.id}`,
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
