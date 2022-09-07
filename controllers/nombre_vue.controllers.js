const db = require('../models');
const http = require('../common/http');
const validate = require('../common/common');
const { SUCCESS, VALIDATE_ERROR, INTERNAL_SERVER_ERROR, ERROR } = require('../common/constant');
const nombre_vues = require('../models/nombre_vues');

const Nombre_vues = db.nombre_vues;

exports.findOrCreate = (req,res)=>{

  const req_body ={
    id : req.query.id
  };

  Nombre_vues.findOrCreate({where : {livre_id : req_body.id}})
  .then(([nombre_vue, created])=>{
    if(created){
      nombre_vue.count =1;
      http.send(req, res, SUCCESS, nombre_vue.count);
    }
    else{
      nombre_vue.count+=1;
      http.send(req, res, SUCCESS, nombre_vue.count);
    }
  })
  .catch((err) => {
    console.log(err);
    http.send(req, res, ERROR, err);
  });

}