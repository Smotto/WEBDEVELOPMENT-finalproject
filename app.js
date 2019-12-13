const express = require('express');
const mustache = require('mustache-express');
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('morgan');
const app = express();

/* Router Variables */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

/* Template engine */
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', ['./public/views']);

/* App Uses */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* App Routes */
app.use('/', indexRouter);
app.use('/users', usersRouter);

/* Error 404 */
app.use((req, res, next) => {
	const err = new Error('Error 404: Page not found');
	err.status = 404;
	next(err);
});
/* Handling error */
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.send(err.message);
});

module.exports = app;
