const express = require('express');
const router = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
    destination:(req, file, cb) => {
      cb(null, 'uploads/')
    },
    filename:(req, file, cb) => {
      cb(null,Date.now() + file.originalname);
    }
})
  
  
var upload = multer({
    storage: storage,
    limits:20
})

// const upload = multer({dest: 'uploads/'})

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.render('upload', { title: 'Upload' })
});

router.post('/up', upload.single('file'), (req, res, next) => {
    res.send('arquivo enviado')
})

module.exports = router;
