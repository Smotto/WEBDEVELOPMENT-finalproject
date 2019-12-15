const express = require('express');
const Account = require('../routes/users');
const Photo = require('../routes/images');
const router = express.Router();
const exFileUpload = require('express-fileupload');

let photo = new Photo();
let user = new Account();

/* GET home page. */
router.get('/', (req, res, next) => {
    console.log('Cookies: ', req.cookies);
    console.log(req.session);
    if (req.session.user) { console.log("Current Session ID: " + req.session.user); }
    res.render('index');
});

/* GET home page redirection. */
router.get('/index', (req, res, next) => {
    res.redirect('/');
});

/* GET Register Page */
router.get('/registration', (req, res) => {
    if (req.session.user) {
        res.render('index');
    }
    else {
        res.render('registration');
    }
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
                req.session.active = 0;
                res.json('Welcome '+ userInput.username + '!');
            });
        }
        else {
            console.log('Could not create a new user');
        }
    });
});

/* Get login page */
router.get('/login', (req, res) => {
    if (req.session.user) {
        res.render('index');
    }
    else {
        res.render('login');
    }

});

/* POST login data */
router.post('/login', (req, res, next) => {
    console.log('Login Post Request Received ... ', "Requesting: ", req.body.username, req.body.password);

    if (req.session.user) {
        console.log("Already logged in, also you shouldn't see this at all.");
        res.render('index');
    }
    else {
        user.login(req.body.username, req.body.password, (result) => {
            if(result){
                // TODO: Made the session, but didn't create the user's cookie
                req.session.user = result[0].id;
                req.session.active = 1;
                console.log(req.session);
                console.log('Logged in as: '+ req.session.user);
                res.json("This might be it");
                // res.redirect('localhost:3000/');
            }
            else{
                console.log("Didn't get the account.");
                res.json('Username/Password is incorrect. Try again');
            }
        });
    }
});

/* Search for images */
router.post('/search', (req, res, next) =>
{
    console.log('Search request received.');
    console.log("This is the title request: " + req.body.info);
    // TODO: Send this request to the backend.
    // From the frontend, a request is sent here,
    // we respond with the data to the front end, and
    // then in the frontend redirect to the appropriate viewpost/:userID/:postID with the data.
});
/* View Post */
router.get('/viewpost', (req, res) => {
    res.render('viewpost', {title: 'Post Viewer', body: "Use the search bar above to find a post!"});
});
/* View Singular Post */
router.get('/viewpost/:userID/:postID', (req, res) => {
    // TODO: Get information from database, and render the page based on the information from the database.
    let userID;
    let postID;
    let commentsArrayOrSomething;

    res.render('viewpost', {title: 'Post Viewer', body: "viewpost body.", anyArray: ['a!', 'b@', 'c?']});
});

/* View Post Image Page */
router.get('/postimage', (req, res) => {
    // TODO: If the user is not login, redirect to login page instead
    if (req.session.user) {
        console.log('postimage.hbs initialized');
        res.render('postimage');
    }
    else{
        console.log("You are not in a session.");
        res.redirect('../login');
    }

});

/* Post an Image */
router.post('/postimage', (req, res) => {
    console.log("postimage Post request received.");
    if(req.session.user) {
        let userSubmit = {
            title: req.body.title,
            description: req.body.description,
            fk_userid: req.session.user,
            imageURL: req.body.imageURL
        };

        photo.createPost(userSubmit, (lastId) => {
            //TODO: Move file into public/images and insert into database with user.id
            if(lastId) {
                photo.findImage(lastId, (result) =>{
                    /*file.mv('public/images/upload_images/'+file.name, function(err) {

                        if (err)

                            return res.status(500).send(err);
                        var sql = "INSERT INTO `users_image`(`first_name`,`last_name`,`mob_no`,`user_name`, `password` ,`image`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "','" + img_name + "')";

                        var query = db.query(sql, function(err, result) {
                            res.redirect('profile/'+result.insertId);
                        });
                    });*/
                    res.json(result);
                });
            } else {
                console.log('Could not post image');
            }
        });
    }
    else {
        console.log("You are not logged in.");
        res.redirect('../login');
    }
});

/* LOGOUT */
router.get('/logout', (req, res, next) => {
    if(req.session.user){
        console.log("Logging out user ID: " + req.session.user);
        user.logout(req.session.user, (result) => {
            if (result) {
                req.session.destroy(() => {
                    console.log("Logout Successful!");
                    res.render('logout');
                });
            }
        });
    }
    else {
        res.redirect('/');
    }
});

module.exports = router;