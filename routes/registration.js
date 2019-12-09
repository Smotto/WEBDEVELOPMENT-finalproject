const express = require('express');
const registrationRouter = express.Router();

registrationRouter.use((req, res, next) =>
{
    console.log('middleware being used');
    next();
});

registrationRouter.get('/', function(req, res)
{
    console.log('registration.mustache initialized');
    res.render('registration');
});

// If you don't export, nobody can import it :thinking:
module.exports = registrationRouter;