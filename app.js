const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// require('dotenv')
// const forceSSL = require('express-force-ssl');
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');
require('./config/auth')(passport)


const indexRouter = require('./routes/index');
const produtosRouter = require('./routes/produtos');
const menuRouter = require('./routes/menu');
const uploadRouter = require('./routes/upload')

authenticationMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

var app = express();


// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');



// app.use(forceSSL);
app.use(helmet())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));


app.use(session({
  secret: process.env.SECRET || '123',
  resave:false,
  saveUninitialized:false,
  cookie:{maxAge: 50 * 60 * 1000}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/upload', authenticationMiddleware, uploadRouter)
app.use('/menu', authenticationMiddleware, menuRouter)
app.use('/cadastro', authenticationMiddleware, produtosRouter);
app.use('/', indexRouter);




// catch 404
app.use((req, res, next) => {
  res.status(404).send('Not found');
  next();
});



module.exports = app;
