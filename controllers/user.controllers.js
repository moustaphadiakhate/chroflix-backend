/* eslint-disable camelcase */
const db = require('../models');
const http = require('../common/http');
const validate = require('../common/common');
const { SUCCESS, VALIDATE_ERROR, INTERNAL_SERVER_ERROR, ERROR } = require('../common/constant');
const multer = require('../config/multer_config');



const User = db.users;
const upload = multer;


exports.get_users = (req, res) => {
  const limit = 10;
  const offset = 0 + ((req.query.page || 1) - 1) * limit;
  User.findAll({ offset, limit })
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

  const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };
  const req_body = {
    id: req.body.id ,
     avatar :`${req.protocol}://${req.get('host')}/uploads/avatar/`
  
  };

  
  if ( (req.file.mimetype  in  MIME_TYPES ) ) {  

    validate
    .validation(Object.keys(req_body), req_body)
    .then(async ({ status, response }) => {
      if (status) {
        User.findOne({ where: { id: req_body.id } })
          .then(async(user) => {
            const pseudo = user.pseudo;
             user.avatar = req_body.avatar+pseudo+'.'+ req.file.filename;
               await user.save();
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
  }  
  else {  
    res.send('file not uploaded since it\'s not a PNG or JPEG');  
   } ;
};