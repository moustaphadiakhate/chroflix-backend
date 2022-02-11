/* eslint-disable no-use-before-define */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable camelcase */
const multer = require('multer');
const shortid = require('shortid');
const db = require('../models');
const http = require('../common/http');
const validate = require('../common/common');
const { SUCCESS, VALIDATE_ERROR, INTERNAL_SERVER_ERROR, ERROR } = require('../common/constant');

const storage = multer.diskStorage({
  destination: './uploads/input',
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${shortid.generate()}`);
  },
});

const upload = multer({ storage });

const Livres = db.livres;
const Chapitres = db.chapitres;

exports.get_livres = (req, res) => {
  Livres.findAll()
    .then((livres) => {
      const response_livres = livres.map(async (livre) => {
        const chapitres = await chapitre_finders(livre.id);
        return {
          id: livre.id,
          genre_id: livre.genre_id,
          prix: livre.prix,
          thumbnail: livre.thumbnail,
          description: livre.description,
          chapitres: chapitres || [],
        };
      });
      http.send(req, res, SUCCESS, response_livres);
    })
    .catch((err) => {
      console.log(err);
      http.send(req, res, ERROR, err);
    });
};

exports.get_livre = (req, res) => {
  const req_body = {
    id: req.query.id,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Livres.findOne({ where: { id: req_body.id } })
          .then(async (livre) => {
            // find all chapiter titles
            const chapitres = await chapitre_finders(livre.id);
            const response_livre = {
              id: livre.id,
              genre_id: livre.genre_id,
              prix: livre.prix,
              thumbnail: livre.thumbnail,
              description: livre.description,
              chapitres: chapitres || [],
            };
            http.send(req, res, SUCCESS, response_livre);
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

// getmy books

exports.get_my_livres = (req, res) => {
  // or livre_is as id
  const req_body = {
    auteur_id: req.query.auteur_id,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Livres.find({ where: { auteur_id: req_body.auteur_id } })
          .then((livres) => {
            http.send(req, res, SUCCESS, livres);
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

// Create and Save a new Book
exports.create_livre = (req, res) => {
  const req_body = {
    auteur_id: req.body.auteur_id,
    genre_id: req.body.genre_id,
    titre: req.body.titre,
    slug: req.body.slug,
    thumbnail: req.body.thumbnail,
    description: req.body.description,
    prix: req.body.prix,
    banaliser: req.body.banaliser,
    age: req.body.age,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Livres.create(req_body)
          .then((data) => {
            http.send(req, res, SUCCESS, data);
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              message: err.message || 'Some error occurred while creating the Book.',
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
  // Save Book in database
};

// Find a single Book with an id
exports.findById = (req, res) => {
  const req_body = {
    id: req.query.id,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Livres.findByPk(req_body.id)
          .then((livre) => {
            http.send(req, res, SUCCESS, livre);
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

// Update a Book by the id in the request
exports.update_livre = (req, res) => {
  const req_body = {
    id: req.body.id,
    ...req.body,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Livres.update(req_body, { where: { id: req_body.id } })
          .then((num) => {
            if (num === 1) {
              http.send(req, res, SUCCESS, {
                message: 'Book was updated successfully.',
              });
            } else {
              http.send(req, res, ERROR, {
                message: `Cannot update Book with id=${req_body.id}. Maybe Book was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            http.send(req, res, ERROR, { message: `Error updating Book with id=${req_body.id}` });
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

// Delete a Book with the specified id in the request
exports.delete_livre = (req, res) => {
  const req_body = {
    id: req.query.id,
  };

  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Livres.destroy({ where: { id: req_body.id } })
          .then((num) => {
            if (num === 1) {
              http.send(req, res, SUCCESS, {
                message: 'Book was deleted successfully!',
              });
            } else {
              http.send(req, res, ERROR, {
                message: `Cannot delete Book with id=${req_body.id}. Maybe Book was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            http.send(req, res, ERROR, { sage: `Error deleting Book with id=${req_body.id}` });
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
const chapitre_finders = (livre_id) =>
  new Promise((resolve, reject) => {
    Chapitres.findAll({ where: { livre_id } })
      .then((chapitres) => {
        resolve(chapitres);
      })
      .catch((err) => {
        reject(err);
      });
  });
