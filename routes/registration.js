const express = require('express');
const registrationRouter = express.Router();
const Account = require('../routes/users');
const user = new Account();

registrationRouter.use((req, res, next) =>
{
    console.log('Registration middleware being used.');
    next();
});

registrationRouter.get('/', function(req, res)
{
    console.log('registration.mustache initialized');
    res.render('registration');
});

/* POST register data */
registrationRouter.post('/', function(request, response)
{
    console.log("Registration Post Request Received.");
    let userInput = {
        username: request.body.username,
        fullname: request.body.fullname,
        password: request.body.password
    };

    // TODO: Fix error
    // Not a routing issue
    user.create(userInput, function(lastId) {
        if(lastId) {
            user.find(lastId, function(result) {
                request.session.user = result;
                request.session.opp = 0;
                response.redirect('/index');
            });
        }
        else {
            console.log('Could not create a new user');
        }
    });
});

module.exports = registrationRouter;