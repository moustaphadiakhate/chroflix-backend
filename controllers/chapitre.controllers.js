/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable camelcase */
const db = require('../models');
const http = require('../common/http');
const validate = require('../common/common');
const { SUCCESS, VALIDATE_ERROR, INTERNAL_SERVER_ERROR, ERROR } = require('../common/constant');

const Chapitres = db.chapitres;

exports.get_chapitres = (req, res) => {
  const limit = 10;
  const offset = 0 + ((req.query.page || 1) - 1) * limit;
  Chapitres.findAll({ offset, limit })
    .then((chapitre) => {
      http.send(req, res, SUCCESS, chapitre);
    })
    .catch((err) => {
      console.log(err);
      http.send(req, res, ERROR, err);
    });
};

exports.get_chapitre = (req, res) => {
  const req_body = {
    id: req.query.id,
    livre_id: req.query.livre_id,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Chapitres.findOne({ where: { id: req_body.id } })
          .then((chapitre) => {
            http.send(req, res, SUCCESS, chapitre);
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

// Create and Save a new Chapitres
exports.create_chapitre = (req, res) => {
  const req_body = {
    livre_id: req.body.livre_id,
    titre: req.body.titre,
    banaliser: req.body.banaliser,
    ...req.body,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Chapitres.create(req_body)
          .then((data) => {
            http.send(req, res, SUCCESS, data);
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              message: err.message || 'Some error occurred while creating the Chapitres.',
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
  // Save Chapitres in database
};

// Find a single Chapitres with an id
exports.findById = (req, res) => {
  const req_body = {
    id: req.query.id,
    livre_id: req.query.livre_id,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Chapitres.findByPk(req_body.id)
          .then((chapitre) => {
            http.send(req, res, SUCCESS, chapitre);
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

// Update a Chapitres by the id in the request
exports.update_chapitre = (req, res) => {
  const req_body = {
    id: req.body.id,
    livre_id: req.body.livre_id,
    ...req.body,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Chapitres.update(req_body, { where: { id: req_body.id } })
          .then((num) => {
            if (num === 1) {
              http.send(req, res, SUCCESS, {
                message: 'Chapitres was updated successfully.',
              });
            } else {
              http.send(req, res, ERROR, {
                message: `Cannot update Chapitres with id=${req_body.id}. Maybe Chapitres was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              message: `Error updating Chapitres with id=${req_body.id}`,
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

// Delete a Chapitres with the specified id in the request
exports.delete_chapitre = (req, res) => {
  const req_body = {
    id: req.query.id,
    livre_id: req.query.livre_id,
  };

  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Chapitres.destroy({ where: { id: req_body.id } })
          .then((num) => {
            if (num === 1) {
              http.send(req, res, SUCCESS, {
                message: 'Chapitres was deleted successfully!',
              });
            } else {
              http.send(req, res, ERROR, {
                message: `Cannot delete Chapitres with id=${req_body.id}. Maybe Chapitres was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              sage: `Error deleting Chapitres with id=${req_body.id}`,
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
