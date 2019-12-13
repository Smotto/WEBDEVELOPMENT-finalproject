const express = require('express');
const Account = require('../routes/users');
const router = express.Router();
let user = new Account();
const session = require('express-session');

router.use(session({
    secret: 'my-dirty-little-secret',
    // store: new MssqlStore(options), // see options variable
    resave: false,
    saveUninitialized: false,
    cookie:{originalMaxAge: 60 * 1000 * 30}
}));

/* GET home page. */
router.get('/', (req, res, next) => {
    console.log('Cookies: ', req.cookies);
    console.log(req.session);
    if (req.session.user) { console.log("Current Session ID: " + req.session.user); }
    res.render('index', { title: 'Home' , success: req.session.success, errors: req.session.errors});
    req.session.errors = null;
});
/* GET home page redirection. */
router.get('/index', (req, res, next) => {
    res.redirect('/');
});
/* GET Register Page */
router.get('/registration', (req, res) => {
    res.render('registration');
});
/* POST register data */
router.post('/registration', (req, res) => {
    let userInput = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    user.create(userInput, (lastId) => {
        if(lastId) {
            user.find(lastId, (result) => {
                req.session.user = result[0].id;
                // TODO: Set Active to 0 in database
                req.session.opp = 0;
                res.send('Welcome'+ userInput.username);
            });
        }
        else {
            console.log('Could not create a new user');
        }
    });
});

/* Get login page */
router.get('/login', (req, res) => {
    res.render('login');
});
/* POST login data */
router.post('/login', (req, res, next) => {
    console.log('Login Post Request Received ... ', "Requesting: ", req.body.username, req.body.password);

    user.login(req.body.username, req.body.password, (result) => {
        if(result){
            req.session.user = result[0].id;
            req.session.opp = 1;
            console.log(req.session);
            console.log('Logged in as: '+ req.session.user);
            // res.redirect('localhost:3000/');
        }
        else{
            console.log("Didn't get the account.");
            res.send('Username/Password is incorrect. Try again');
        }
    });
});

/* View Singular Post */
router.get('/viewpost', (req, res) => {
    console.log('viewpost.mustache initialized');
    res.render('viewpost', {title: 'Post Viewer'});
});

/* View Post Image Page */
router.get('/postimage', (req, res) => {
    // TODO: If the user is not login, redirect to login page instead
    console.log('postimage.mustache initialized');
    res.render('postimage');
});
/* Post an Image */
router.post('/postimage', (req, res) => {
    console.log("postimage Post request received.")
});

/* LOGOUT */
router.get('/logout', (req, res, next) => {
    if(req.session){
        console.log("Logging out user ID: " + req.session.user);
        req.session.destroy(() => {
            console.log("Logout Successful!");
            // TODO: When logged out, reset active in the database.
            // TODO: What if the user just exits the browser? How do we reset active in the database?
            res.render('logout');
        });
    }
    else {
        res.redirect('/');
    }
});

module.exports = router;