/* eslint-disable no-use-before-define */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable camelcase */
// const multer = require('multer');
const shortid = require('shortid');
const db = require('../models');
const http = require('../common/http');
const validate = require('../common/common');
const { SUCCESS, VALIDATE_ERROR, INTERNAL_SERVER_ERROR, ERROR } = require('../common/constant');
const multer = require('../config/multerLivre_config');


// const storage = multer.diskStorage({
//   destination: './uploads/input',
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}-${shortid.generate()}`);
//   },
// });


const thumbnail_prex = 'https://chroflix.com/storage';
const upload = multer;

const Livres = db.livres
const Chapitres = db.chapitres;
const Auteurs = db.auteurs;
const Users = db.users;
const Genres = db.genres;
const Votes = db.votes;
const Transactions = db.transactions;

exports.get_livres = (req, res) => {
  const limit = 10;
  const offset = 0 + ((req.query.page || 1) - 1) * limit;
  Livres.findAll({ offset, limit })
    .then(async (livres) => {
      const response_livres = await Promise.all(
        livres.map(async (livre) => {
          const chapitres = await chapitres_finder(livre.id);
          const auteur =  await Auteurs.findOne({ where: { id: livre.auteur_id }});
          const user =  await Users.findOne({ where: { id: auteur.user_id }});
          const genre =  await Genres.findOne({ where: { id: livre.genre_id }});
          const like =  await Votes.count({ where: { livre_id: livre.id }});
          const nombre_ventes = await Transactions.count({where : {livre_id : livre.id }})
          // const nombre_vue = await get_nombre_vue(livre.id)
         
          return {
            auteur: livre.auteur_id,
              pseudo_auteur :auteur.pseudo,
              nom_auteur : user.nom,
              prenom_auteur : user.prenom,
              livre_id: livre.id,
              titre: livre.titre,
              genre_id: livre.genre_id,
              genre: genre.genre,
              prix: livre.prix,
              // thumbnail: livre.thumbnail.replace('public', thumbnail_prex),
              thumbnail: livre.thumbnail,
              description: livre.description,
              like : like,
              nombre_ventes : nombre_ventes ,
              chapitres: chapitres || [],
              
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

exports.get_livre = (req, res) => {
  const req_body = {
    id: req.query.id,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        Livres.findOne({ where: { id: req_body.id }})
          .then(async (livre) => {
            // find all chapiter titles
             const chapitres = await chapitres_finder(livre.id);
             const auteur =  await Auteurs.findOne({ where: { id: livre.auteur_id }});
             const user =  await Users.findOne({ where: { id: auteur.user_id }});
             const genre =  await Genres.findOne({ where: { id: livre.genre_id }});
             console.log(genre);
             const like =  await Votes.count({ where: { livre_id: livre.id }});
             const nombre_ventes = await Transactions.count({where : {livre_id : livre.id }});
  
             const response_livre = {
              auteur: livre.auteur_id,
              pseudo_auteur :auteur.pseudo,
              nom_auteur : user.nom,
              prenom_auteur : user.prenom,
              livre_id: livre.id,
              titre: livre.titre,
              genre_id: livre.genre_id,
              genre: genre.genre,
              prix: livre.prix,
              thumbnail: livre.thumbnail.replace('public', thumbnail_prex),
              thumbnail: livre.thumbnail,
              description: livre.description,
              like : like,
              nombre_ventes : nombre_ventes ,
              chapitres: chapitres || [],  
            };
            http.send(req, res, SUCCESS, response_livre);
          })
          .catch((err) => {
            console.log(err);
            http.send(req, res, ERROR, { message: 'book not found in database' });
          });
      } else {
        http.send(req, res, VALIDATE_ERROR, response);
      }
    })
    .catch((err) => {
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
        Livres.findAll({ where: { auteur_id: req_body.auteur_id } })
          .then(async (livres) => {
            const response_livres = await Promise.all(
              livres.map(async (livre) => {
                // const chapitres = await chapitres_finder(livre.id);
                const auteur =  await Auteurs.findOne({ where: { id: livre.auteur_id }});
                const user =  await Users.findOne({ where: { id: auteur.user_id }});
                const genre =  await Genres.findOne({ where: { id: livre.genre_id }});
                const like =  await Votes.count({ where: { livre_id: livre.id }});
                const nombre_ventes = await Transactions.count({where : {livre_id : livre.id }});

                return {
                  auteur: livre.auteur_id,
                    pseudo_auteur :auteur.pseudo,
                    nom_auteur : user.nom,
                    prenom_auteur : user.prenom,
                    livre_id: livre.id,
                    titre: livre.titre,
                    genre_id: livre.genre_id,
                    genre: genre.genre,
                    prix: livre.prix,
                    thumbnail: livre.thumbnail,
                    description: livre.description,
                    like : like,
                    nombre_ventes : nombre_ventes , 
                    // chapitres: chapitres || [],
                    // nombre_de_vue : nombre_vue, 
                    
                };
              })
            );
            http.send(req, res, SUCCESS, response_livres);
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
  
  const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
  };
  
  if ( (req.file.mimetype  in  MIME_TYPES ) ){
    const req_body = {
      auteur_id: req.body.auteur_id,
      genre_id: req.body.genre_id,
      titre: req.body.titre,
      slug: req.body.titre.replace(/ /g, '-').replace(/'/g, '_'),
      thumbnail: `${req.protocol}://${req.get('host')}/uploads/input/${req.file.filename}`, // posted image
      description: req.body.description,
      prix: req.body.prix,
      banaliser: 0,
      age: 0,
    };
    validate
      .validation(Object.keys(req_body), req_body)
      .then(async ({ status, response }) => {
        if (status) {
          Livres.create(req_body)
            .then((data) => {
              data.save();
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
  }
  else {  
    res.send('file not uploaded since it\'s not a PNG or JPEG');  
   } ;
  // upload a photo
  
  // Save Book in database
};

// Find a single Book with an id
exports.findById = (req, res) => {
  const req_body = {
    id: req.query.id,
    auteur_id: req.query.auteur_id,
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
const chapitres_finder = (livre_id) =>
  new Promise((resolve, reject) => {
    Chapitres.findAll({ where: { livre_id } })
      .then(async (chapitres) => {
        const results = await Promise.all(
          chapitres.map(async (chapitre) => ({
            id: chapitre.id,
            livre_id: chapitre.livre_id,
            titre: chapitre.titre,
          }))
        );
        resolve(results);
      })
      .catch((err) => {
        reject(err);
      });
  });





 