const express = require('express');
const Usuario = require('../database/usuario')
const router = express.Router();
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(process.env.SALT || 10) // variavel de ambient

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('cad',{ title:'Cadastro de Usuario' })
});

router.post('/cad', (req, res, next) => {
  let senhaParaSalvar = bcrypt.hashSync(req.body.senha, salt)
  Usuario.create({
    user:req.body.usuario,
    mail:req.body.email,
    pass:senhaParaSalvar
  }).then(() => {
    console.log('Novo Usuario:'+req.body.usuario)
    console.log('Email:'+req.body.email)
    console.log('Senha:'+senhaParaSalvar)
  }).catch((err) => console.log('error: '+ err))
  
  res.redirect('/')
})

module.exports = router;
