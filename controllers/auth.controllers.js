/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const shortid = require('shortid');
const config = require('../config');
const db = require('../models');
const http = require('../common/http');
const validate = require('../common/common');
const { SUCCESS, VALIDATE_ERROR, INTERNAL_SERVER_ERROR, ERROR } = require('../common/constant');

const def_avatar = 'https://chroflix.com/images/default_avatar.png';
const User = db.users;

exports.signup = (req, res) => {
  // Save user to database
  const req_body = {
    nom: req.body.nom,
    pseudo: req.body.pseudo,
    prenom: req.body.prenom,
    email: req.body.email,
    password: req.body.password,
  };

  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
     User.findOne({ where: { email: req_body.email} })
          .then(async(user) => {
            const pseudo_verification= await User.findOne({ where: { pseudo: req_body.pseudo} });
            if (user) {
                http.send(req, res, ERROR, { message: 'email already used ' });
            }
            else if ( pseudo_verification ) {
              http.send(req, res, ERROR, { message: 'pseudo already used ' });
          }
            else {
              User.create({
                nom: req_body.nom,
                pseudo: req_body.pseudo,
                prenom: req_body.prenom,
                email: req_body.email,
                password: bcrypt.hashSync(req_body.password, 10),
                profil: `user_${shortid.generate()}`,
                avatar: def_avatar,
              })
                .then(async (new_user) => {
                  const response_data = {
                    nom: new_user.nom,
                    pseudo: new_user.pseudo,
                    prenom: new_user.prenom,
                    email: new_user.email,
                    access_token: await get_token({
                      user_id: new_user.id,
                      pseudo: new_user.pseudo,
                      email: new_user.email,
                    }),
                  };
                //  new_user.save() ;
                  http.send(req, res, SUCCESS, response_data);
                })
                .catch((err) => {
                  
                  http.send(req, res, ERROR, err);
                });
            }
          })
          .catch((err) => {
            
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

exports.signin = (req, res) => {
  const req_body = {
    pseudo: req.body.pseudo,
    password: req.body.password,
  };

  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        User.findOne({ where: { pseudo: req_body.pseudo } })
          .then(async (user) => {
            if (!user) {
              return http.send(req, res, ERROR, { message: 'User Not found.' });
            }

            const passwordIsValid = bcrypt.compareSync(req_body.password, user.password);

            if (!passwordIsValid) {
              return http.send(req, res, ERROR, { message: 'Invalid Password!' });
            }
            const response_data = {
              id: user.id,
              pseudo: user.pseudo,
              email: user.email,
              accessToken: await get_token({
                user_id: user.id,
                pseudo: user.pseudo,
                email: user.email,
              }),
            };
            http.send(req, res, SUCCESS, response_data);
          })
          .catch((err) => {
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

// private functions

const get_token = async (obj) => {
  const token = await jwt.sign(obj, config.auth.secret, {
    expiresIn: '1y', // 1 year
  });
  return token;
};
