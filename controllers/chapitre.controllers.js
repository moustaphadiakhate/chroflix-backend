/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable camelcase */
const db = require('../models');
const http = require('../common/http');
const validate = require('../common/common');
const { SUCCESS, VALIDATE_ERROR, INTERNAL_SERVER_ERROR, ERROR } = require('../common/constant');

const Chapitre = db.chapitre;

exports.get_chapitres = (req, res) => {
  Chapitre.findAll()
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
        Chapitre.findOne({
          where: {
            id: req_body.id,
          },
        })
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

// Create and Save a new Chapitre
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
        Chapitre.create(req_body)
          .then((data) => {
            http.send(req, res, SUCCESS, data);
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              message: err.message || 'Some error occurred while creating the Chapitre.',
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
  // Save Chapitre in database
};

// Find a single Chapitre with an id
exports.findById = (req, res) => {
  const req_body = {
    id: req.query.id,
    livre_id: req.query.livre_id,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Chapitre.findByPk(req_body.id)
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

// Update a Chapitre by the id in the request
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
        Chapitre.update(req_body, {
          where: { id: req_body.id },
        })
          .then((num) => {
            if (num === 1) {
              http.send(req, res, SUCCESS, {
                message: 'Chapitre was updated successfully.',
              });
            } else {
              http.send(req, res, ERROR, {
                message: `Cannot update Chapitre with id=${req_body.id}. Maybe Chapitre was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              message: `Error updating Chapitre with id=${req_body.id}`,
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

// Delete a Chapitre with the specified id in the request
exports.delete_chapitre = (req, res) => {
  const req_body = {
    id: req.query.id,
    livre_id: req.query.livre_id,
  };

  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Chapitre.destroy({
          where: { id: req_body.id },
        })
          .then((num) => {
            if (num === 1) {
              http.send(req, res, SUCCESS, {
                message: 'Chapitre was deleted successfully!',
              });
            } else {
              http.send(req, res, ERROR, {
                message: `Cannot delete Chapitre with id=${req_body.id}. Maybe Chapitre was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              sage: `Error deleting Chapitre with id=${req_body.id}`,
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
