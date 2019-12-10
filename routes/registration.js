const express = require('express');
const registrationRouter = express.Router();

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

registrationRouter.post('/', function(req, res)
{
    console.log("Registration Post Request Received.")
});

/* POST register data
registrationRouter.post('/registration', (req, res, next) => {
    let userInput = {
        username: req.body.username,
        fullname: req.body.fullname,
        password: req.body.password
    };

    user.create(userInput, function(lastId) {
        if(lastId) {
            user.find(lastId, function(result) {
                req.session.user = result;
                req.session.opp = 0;
                res.redirect('/home');
            });
        }
        else {
            console.log('Could not create a new user');
        }
    });
});
 */

module.exports = registrationRouter;