/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable camelcase */
const db = require('../models');
const http = require('../common/http');
const validate = require('../common/common');
const { SUCCESS, VALIDATE_ERROR, INTERNAL_SERVER_ERROR, ERROR } = require('../common/constant');

const Auteurs = db.auteurs;
const Livres = db.livres;
const Abonnements = db.abonnements;

exports.get_auteurs = (req, res) => {
  const limit = 10;
  const offset = 0 + ((req.query.page || 1) - 1) * limit;
  Auteurs.findAll({ offset, limit })
    .then(async(auteurs) => {


      const response_livres = await Promise.all(
        auteurs.map(async (auteur) => {
          const publication = await Livres.count({where : {auteur_id : auteur.id}});
          const abonne = await Abonnements.count({where : {auteur_id : auteur.id}});
          return { 
            id : auteur.id,
            user_id : auteur.user_id,
            pseudo : auteur.pseudo,
            approuver : auteur.approuver,
            certifier : auteur.certifier,
            banaliser : auteur.banaliser,
            createdAt : auteur.createdAt,
            updatedAt : auteur.updatedAt,
            nombre_de_publication : publication,
            nombre_abonne : abonne
          };
        })
      );
      http.send(req, res, SUCCESS, response_livres);
    })
    .catch((err) => {
      console.log(err);
      http.send(req, res, ERROR, err);
    });
};
 
exports.get_auteur = (req, res) => {
  const req_body = {
    id: req.query.id,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Auteurs.findOne({ where: { id: req_body.id } })
          .then(async(auteur) => {
            const publication = await Livres.count({where : {auteur_id : auteur.id}});
            const abonne = await Abonnements.count({where : {auteur_id : auteur.id}});
            const res_publication =
            {
              id : auteur.id,
              user_id : auteur.user_id,
              pseudo : auteur.pseudo,
              approuver : auteur.approuver,
              certifier : auteur.certifier,
              banaliser : auteur.banaliser,
              createdAt : auteur.createdAt,
              updatedAt : auteur.updatedAt,
              nombre_de_publication : publication,
              nombre_abonne : abonne
            };
            http.send(req, res, SUCCESS,res_publication)
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

// Create and Save a new Auteur
exports.create_auteur = (req, res) => {
  const req_body = {
    user_id: req.body.user_id,
    pseudo: req.body.pseudo,
    approuver: req.body.approuver,
    certifier: req.body.certifier,
    banaliser: req.body.banaliser,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Auteurs.create(req_body)
          .then((data) => {
            http.send(req, res, SUCCESS, data);
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              message: err.message || 'Some error occurred while creating the Auteur.',
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
  // Save Auteur in database
};

// Find a single Auteur with an id
exports.findById = (req, res) => {
  const req_body = {
      // id: req.query.id,
    user_id: req.query.user_id,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Auteurs.findByPk(req_body.user_id)
          .then((auteur) => {
            http.send(req, res, SUCCESS, auteur);
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

// Update a Auteur by the id in the request
exports.update_auteur = (req, res) => {
  const req_body = {
    id: req.body.id,
    ...req.body,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Auteurs.update(req_body, { where: { id: req_body.id } })
          .then((num) => {
            if (num === 1) {
              http.send(req, res, SUCCESS, {
                message: 'Auteur was updated successfully.',
              });
            } else {
              http.send(req, res, ERROR, {
                message: `Cannot update Auteur with id=${req_body.id}. Maybe Auteur was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              message: `Error updating Auteur with id=${req_body.id}`,
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

// Delete a Auteur with the specified id in the request
exports.delete_auteur = (req, res) => {
  const req_body = {
    id: req.query.id,
  };

  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Auteurs.destroy({ where: { id: req_body.id } })
          .then((num) => {
            if (num === 1) {
              http.send(req, res, SUCCESS, {
                message: 'Auteur was deleted successfully!',
              });
            } else {
              http.send(req, res, ERROR, {
                message: `Cannot delete Auteur with id=${req_body.id}. Maybe Auteur was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            http.send(req, res, ERROR, {
              sage: `Error deleting Auteur with id=${req_body.id}`,
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


exports.get_auteur_user_id = (req, res) => {
  const req_body = {
    user_id: req.query.user_id,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Auteurs.findOne({ where: { user_id: req_body.user_id } })
          .then(async(auteur) => {
            const publication = await Livres.count({where : {auteur_id : auteur.id}});
            const abonne = await Abonnements.count({where : {auteur_id : auteur.id}});
            const res_publication =
            {
              id : auteur.id,
              user_id : auteur.user_id,
              pseudo : auteur.pseudo,
              approuver : auteur.approuver,
              certifier : auteur.certifier,
              banaliser : auteur.banaliser,
              createdAt : auteur.createdAt,
              updatedAt : auteur.updatedAt,
              nombre_de_publication : publication,
              nombre_abonne : abonne
            };
            http.send(req, res, SUCCESS,res_publication)
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