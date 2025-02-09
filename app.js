const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('morgan');
const app = express();
const fileUpload = require('express-fileupload');

/* Router Variables */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

/* Sessions */
const session = require('express-session');
app.use(session({
	secret: 'my-dirty-little-secret',
	// store: new MssqlStore(options), // see options variable
	resave: false,
	saveUninitialized: false,
	cookie:{originalMaxAge: 60 * 1000 * 30},
	limit: '5mb'
}));

/* Template engine */
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

/* App Uses */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

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
