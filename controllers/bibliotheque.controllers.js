/* eslint-disable no-use-before-define */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable camelcase */
const db = require('../models');
const http = require('../common/http');
const validate = require('../common/common');
const { SUCCESS, VALIDATE_ERROR, INTERNAL_SERVER_ERROR, ERROR } = require('../common/constant');

const Bibliotheques = db.bibliotheques;
const Livres = db.livres;

exports.get_bibliotheques = (req, res) => {
  Bibliotheques.findAll()
    .then((bibliotheques) => {
      http.send(req, res, SUCCESS, bibliotheques);
    })
    .catch((err) => {
      console.log(err);
      http.send(req, res, ERROR, err);
    });
};

exports.get_bibliotheque = (req, res) => {
  const req_body = {
    id: req.query.id,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Bibliotheques.findOne({ where: { id: req_body.id } })
          .then((bibliotheque) => {
            http.send(req, res, SUCCESS, bibliotheque);
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

// self a Bibliotheque

exports.get_my_bibliotheque = (req, res) => {
  const req_body = {
    user_id: req.query.user_id,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Bibliotheques.findAll({ where: { user_id: req_body.user_id } })
          .then(async (bibliotheques) => {
            // find all books titles
            const results = await Promise.all(
              bibliotheques.map(async (bib) => {
                const livre = await livre_finder(bib.livre_id);
                return {
                  id: bib.id,
                  user_id: bib.user_id,
                  livre,
                  current_page: bib.current_page,
                };
              })
            );
            http.send(req, res, SUCCESS, results);
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

// Create and Save a new Bibliotheque
exports.create_bibliotheque = (req, res) => {
  const req_body = {
    livre_id: req.body.livre_id,
    user_id: req.body.user_id,
    current_page: req.body.current_page,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Bibliotheques.create(req_body)
          .then((data) => {
            http.send(req, res, SUCCESS, data);
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              message: err.message || 'Some error occurred while creating the Bibliotheque.',
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
  // Save Bibliotheque in database
};

// Find a single Bibliotheque with an id
exports.findById = (req, res) => {
  const req_body = {
    id: req.query.id,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Bibliotheques.findByPk(req_body.id)
          .then((bibliotheque) => {
            http.send(req, res, SUCCESS, bibliotheque);
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

// Update a Bibliotheque by the id in the request
exports.update_bibliotheque = (req, res) => {
  const req_body = {
    id: req.body.id,
    ...req.body,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Bibliotheques.update(req_body, { where: { id: req_body.id } })
          .then((num) => {
            if (num === 1) {
              http.send(req, res, SUCCESS, {
                message: 'Bibliotheque was updated successfully.',
              });
            } else {
              http.send(req, res, ERROR, {
                message: `Cannot update Bibliotheque with id=${req_body.id}. Maybe Bibliotheque was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              message: `Error updating Bibliotheque with id=${req_body.id}`,
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

// Delete a Bibliotheque with the specified id in the request
exports.delete_bibliotheque = (req, res) => {
  const req_body = {
    id: req.query.id,
  };

  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Bibliotheques.destroy({ where: { id: req_body.id } })
          .then((num) => {
            if (num === 1) {
              http.send(req, res, SUCCESS, {
                message: 'Bibliotheque was deleted successfully!',
              });
            } else {
              http.send(req, res, ERROR, {
                message: `Cannot delete Bibliotheque with id=${req_body.id}. Maybe Bibliotheque was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              sage: `Error deleting Bibliotheque with id=${req_body.id}`,
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

// private functions
const livre_finder = (livre_id) =>
  new Promise((resolve, reject) => {
    Livres.findOne({ where: { id: livre_id } })
      .then((livre) => {
        resolve({ id: livre.id, titre: livre.titre });
      })
      .catch((err) => {
        reject(err);
      });
  });
