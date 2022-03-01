const express = require('express');
const router = express.Router();
const ExpressBrute = require('express-brute');
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);
const passport = require('passport')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index',{ title:'Pagina de Loguin' })
});

router.post('/entrar',bruteforce.prevent, passport.authenticate('local', {failureRedirect:'/'}),(req, res, next) => {
	res.redirect('/menu')
});



module.exports = router;
