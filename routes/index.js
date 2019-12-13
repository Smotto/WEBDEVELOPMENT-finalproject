const express = require('express');
const session = require('express-session');
const Account = require('../routes/users');
const appModule = require('../app');
const router = express.Router();
let user = new Account();
let sess = appModule.sess;

// Middleware function for sesssions
router.use(session({
    secret: 'photoapp',
    // store: new MssqlStore(options), // see options below
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
/* GET home page redirection. */
router.get('/index', function(req, res, next) {
    res.redirect('/');
});

router.get('/registration', function(req, res)
{
    console.log('registration.mustache initialized');
    res.render('registration');
});

/* POST register data */
router.post('/registration', function(req, res){
    let userInput = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    sess = req.session;
    console.log(sess);

    user.create(userInput, function(lastId) {
        if(lastId) {
            console.log("user pass 1");
            user.find(lastId, function(result) {
                console.log("user pass 2");
                sess.user = result[0].id;
                // TODO: Set Active to 0 in database
                sess.opp = 0;
                res.send('Welcome'+ userInput.username);
            });
        }
        else {
            console.log('Could not create a new user');
        }
    });
});

/* Get login page */
router.get('/login', function(req, res)
{
    console.log('login.mustache initialized');
    res.render('login');
});
/* POST login data */
router.post('/login', function(req, res, next) {
    console.log('Login Post Request Received');
    console.log("Request: ", req.body.username, req.body.password);

    sess = req.session;

    user.login(req.body.username, req.body.password, function(result){
        if(result){
            sess.user = result[0].id;
            sess.opp = 1;
            console.log('Logged in as: '+ req.session.user);

            // res.redirect('localhost:3000/');
        }
        else{
            console.log("Didn't get it.");
            res.send('Username/Password is incorrect. Try again');
        }
    });

});

/* View Singular Post */
router.get('/viewpost', function(req, res)
{
    console.log('viewpost.mustache initialized');
    res.render('viewpost', {title: 'Post Viewer'});
});

/* View Post Image Page */
router.get('/postimage', function(req, res)
{
    // TODO: If the user is not login, redirect to login page instead
    console.log('postimage.mustache initialized');
    res.render('postimage');
});

/* Post an Image */
router.post('/postimage', function(req, res)
{
    console.log("postimage Post request received.")
});

/* LOGOUT */
router.get('/logout', (req, res, next) => {
    if(req.session.user){
        req.session.destroy(function(){
            res.redirect('/');
        });
    }
});

module.exports = router;