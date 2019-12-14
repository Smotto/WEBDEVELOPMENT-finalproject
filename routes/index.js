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

/* View Singular Post */
router.get('/viewpost', (req, res) => {
    console.log('viewpost.hbs initialized');
    res.render('viewpost', {title: 'Post Viewer'});
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
        res.render('index');
    }

});
/* Post an Image */
router.post('/postimage', (req, res) => {
    console.log("postimage Post request received.");
    if(req.session.user) {
        let userSubmit = {
            title: req.body.title,
            description: req.body.description,
            imageURL: req.body.imageURL,
            fk_userid: req.session.user
        };

        var file = req.files.imageURL;
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
                    //res.redirect('/viewpost');
                });
            } else {
                console.log('Could not post image');
            }
        });
        // TODO: Create post using: id, title, description, fk_userid, active, photopath
        // TODO: fk_userid should be from the session, id should be created, everything else should be from the json
        console.log("User session exists!");
        console.log(req.body);        // .body is bodyParser which is part of express
        console.log("User ID: " + req.session.user);

        // Send image url back to the front end
        res.json(req.body.imageURL)
    }
    else {
        console.log("You are not logged in.")
        res.redirect('/login');
    }
});

/* LOGOUT */
router.get('/logout', (req, res, next) => {
    if(req.session.user){
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