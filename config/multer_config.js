const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/avatar');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, + Date.now() + '.' + extension);
  }
});



 module.exports =multer({storage: storage}).single('image');


// const upload = multer({  
//   fileFilter: (req, file, cb) => {  
//     if (file.mimetype === 'image/png') {  
//       cb(null, true);  
//     }  
//     else {  
//       cb(new error);  
//     }  
//   },  
//   dest: './uploads/avatar'  
// }) 

// module.exports = upload.single('image');