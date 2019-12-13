// Must have mustache, express-session, cookie-parser, morgan, path, express.
const express = require('express');
const mustache = require('mustache-express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

/* Routers */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

/* Template engine */
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', ['./public/views']);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

let sess = null;
exports.sess = sess;

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
