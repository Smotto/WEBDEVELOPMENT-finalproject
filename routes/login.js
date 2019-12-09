const express = require('express');
const loginRouter = express.Router();

loginRouter.use((req, res, next) =>
{
    console.log('middleware being used');
    next();
});

loginRouter.get('/', function(req, res)
{
    console.log('login.mustache initialized');
    res.render('login');
});

// If you don't export, nobody can import it :thinking:
module.exports = loginRouter;