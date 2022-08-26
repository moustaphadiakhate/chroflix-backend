/* eslint-disable camelcase */
const db = require('../models');
const http = require('../common/http');
const validate = require('../common/common');
const { SUCCESS, VALIDATE_ERROR, INTERNAL_SERVER_ERROR, ERROR } = require('../common/constant');
const multer = require('../config/multer_config');



const User = db.users;
const upload = multer;


exports.get_users = (req, res) => {
  User.findAll()
    .then((users) => {
      http.send(req, res, SUCCESS, users);
    })
    .catch((err) => {
      console.log(err);
      http.send(req, res, ERROR, err);
    });
};

exports.get_user = (req, res) => {
  const req_body = {
    pseudo: req.query.pseudo,
  };
  validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        User.findOne({ where: { pseudo: req_body.pseudo } })
          .then((user) => {
            http.send(req, res, SUCCESS, user);
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


exports.uploads =(req,res)=>{

  if ((req.file.mimetype === 'image/png')||(req.file.mimetype === 'image/jpeg')) {
    
    const req_body = {
      id: req.body.id ,
     avatar :`${req.protocol}://${req.get('host')}/uploads//${req.file.filename}`
    };
    validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        User.findOne({ where: { id: req_body.id } })
          .then((user) => {
            user.avatar = req_body.avatar;
            http.send(req, res, SUCCESS, user);
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


   } else {
     res.send('error');
   }
  

};