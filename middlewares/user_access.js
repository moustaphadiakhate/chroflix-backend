const http = require('../common/http');
const { NOT_ALLOW_ACCESS, ERROR } = require('../common/constant');
const db = require('../models');

const Transactions = db.transactions;
const Auteurs = db.auteurs;
const Livres = db.livres;

exports.can_access_book = (req, res, next) => {
  next();
};

exports.can_get_delete_chapiter_or_brouillon = (req, res, next) => {
  Livres.findOne({ where: { id: req.query.livre_id } })
    .then((livre) => {
      if (livre.prix !== '0') {
        Transactions.findOne({
          where: { user_id: req.chroflix_user.user_id, livre_id: req.chroflix_user.livre_id },
        })
          .then((transaction) => {
            if (transaction) {
              next();
            } else {
              http.send(req, res, NOT_ALLOW_ACCESS, {
                message: 'You are not allowed to read this beause you did not bougth it.',
              });
            }
          })
          .catch((err) => {
            console.log(err);
            http.send(req, res, ERROR, err);
          });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      http.send(req, res, ERROR, err);
    });
};

exports.can_post_update_chapiter_or_brouillon = (req, res, next) => {
  Livres.findOne({ where: { d: req.body.livre_id } })
    .then((livre) => {
      if (livre) {
        Auteurs.findOne({ where: { user_id: req.chroflix_user.user_id } })
          .then((auteur) => {
            if (auteur && auteur.id === livre.auteur_id) {
              next();
            } else {
              http.send(req, res, NOT_ALLOW_ACCESS, {
                message: 'You are not allowed to set this beause its not yours.',
              });
            }
          })
          .catch((err) => {
            console.log(err);
            http.send(req, res, ERROR, err);
          });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      http.send(req, res, ERROR, err);
    });
};
