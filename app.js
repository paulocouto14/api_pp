const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// var forceSSL = require('express-force-ssl');
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');
require('./config/auth')(passport)


var indexRouter = require('./routes/index');
var produtosRouter = require('./routes/produtos');

function authenticationMiddleware(req, res, next) {
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
  secret:'123',
  resave:false,
  saveUninitialized:false,
  cookie:{maxAge: 2 * 60 * 1000}
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/prod',authenticationMiddleware, produtosRouter);
app.use('/', indexRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send('Not found');
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
