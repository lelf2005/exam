var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var login = require('./routes/login');
var register = require('./routes/register');
var upload = require('./routes/uploadfile');
var qlist = require('./routes/qlist');
var session_chk = require('./routes/session_check');
var exam = require('./routes/exam');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'ilovehuhu',
  cookie: {
    maxAge: 30 * 60 * 1000
  },
  resave: true,
  saveUninitialized: false
}));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', login);
app.use('/register', register);
app.use('/upload', upload);
app.use('/qlist', qlist);
app.use('/session', session_chk);
app.use('/exam', exam);

app.use(express.static(path.join(__dirname, 'static')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.redirect('404.html');
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //res.status(err.status || 500);
  //res.render('error');
  res.redirect('500.html');
});

module.exports = app;
