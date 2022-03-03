const express = require('express');
const router = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
  destination:(req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename:(req, file, cb) => {
    cb(null,Date.now() + '-' + file.originalname);
  }
})
  
var upload = multer({
  storage: storage,
  fileFilter:async (req, file, cb) => {
    console.log('Mimetype: ' + file.mimetype)
    if(file.mimetype === 'application/x-javascript' ){
      console.log('if')
      return cb(null, false)
    }
    else {
      console.log('arquivo enviado')
      return cb(null, true)
    }
  },
  
}).single('file')

router.get('/', (req, res, next) => {
  res.render('upload', { title: 'Upload' })
});

router.post('/up', upload, (req, res, next) => {
  res.redirect('/menu')  
})

module.exports = router;
