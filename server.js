var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');

require('dotenv').config();
require('./config/database');
require('./config/passport');

var indexRouter = require('./routes/index');
var playersRouter = require('./routes/players');
var teamsRouter = require('./routes/teams');
var announcementsRouter = require('./routes/announcements');
var matchesRouter = require('./routes/matches');
var apiRouter = require('./routes/api');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'myTeam',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/players', playersRouter);
app.use('/teams', teamsRouter);
app.use('/', announcementsRouter);
app.use('/', matchesRouter);
app.use('/api', apiRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
