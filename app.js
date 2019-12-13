// Must have mustache, express-session, cookie-parser, morgan, path, express.
const express = require('express');
const session = require('express-session');
const mustache = require('mustache-express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();

/* Routers */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const postimageRouter = require('./routes/postimage');
const registrationRouter = require('./routes/registration');
const viewpostRouter = require('./routes/viewpost');

/* Template engine */
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', ['./public/views']);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/postimage', postimageRouter);
app.use('/registration', registrationRouter);
app.use('/viewpost', viewpostRouter);


/* session */
app.use(session({
	secret: 'photoapp',
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 60 * 1000 * 30
	}
}));

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
