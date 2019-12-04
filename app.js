var express = require('express');
//var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/users', usersRouter);


/* Template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'HTML');*/

/* session
app.use(session({
	secret: 'photo app',
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 60 * 1000 * 30
	}
}));*/

/* Error 404
app.use((req, res, next) => {
	var err = new Error('Error 404: Page not found');
	err.status = 404;
	next(err);
});*/

/* Handling error
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.send(err.message);
});*/

/* Setting server
app.listen(3000, () => {
	console.log('Server currently running on port 3000');
});*/

module.exports = app;
