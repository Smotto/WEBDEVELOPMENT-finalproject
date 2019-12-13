const express = require('express');
const registrationRouter = express.Router();
const Account = require('../routes/users');
const user = new Account();

/*
registrationRouter.use(session({
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
registrationRouter.post('/', function(request, response) {

    let userInput = {
        username: request.body.userName,
        email: request.body.email,
        password: request.body.passWord
    };

    user.create(userInput, function(lastId) {
        if(lastId) {
            response.send('Welcome'+ userInput.username);
            /*user.find(lastId, function(result) {

                request.session.user = result;
                request.session.opp = 0;
                response.redirect('/index');
            });*/
        }
        else {
            console.log('Could not create a new user');
        }
    });
});

module.exports = registrationRouter;