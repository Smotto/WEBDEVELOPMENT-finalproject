const express = require('express');
const registrationRouter = express.Router();
const Account = require('../routes/users');
const user = new Account();

/*
registrationRouter.use(session({
    cookieName: 'sessioncookie',
    secret: 'photoapp',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));
*/

registrationRouter.get('/', function(req, res)
{
    console.log('registration.mustache initialized');
    res.render('registration');
});

/* POST register data */
registrationRouter.post('/', function(request, response)
{
    console.log("Registration Post Request Received.");

    console.log(request.body.userName, request.body.email, request.body.passWord, 0);
    let userInput = {
        username: request.body.userName,
        email: request.body.email,
        password: request.body.passWord
    };

    // TODO: Fix error
    // Not a routing issue
    user.create(userInput, function(lastId) {
        if(lastId) {
            user.find(lastId, function(result) {
                console.log("result: ", result);
                console.log(request.session.user);
                console.log("Checkpoints 1");
                request.session.user = result;
                console.log("Checkpoints 2");
                request.session.opp = 0;
                console.log("Checkpoints 3");
                response.redirect('/index');
            });
        }
        else {
            console.log('Could not create a new user');
        }
    });
});

module.exports = registrationRouter;