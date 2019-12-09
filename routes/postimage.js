const express = require('express');
const loginRouter = express.Router();

loginRouter.use((req, res, next) =>
{
    console.log('Postimage middleware being used.');
    next();
});

loginRouter.get('/', function(req, res)
{
    console.log('postimage.mustache initialized');
    res.render('postimage', {title: 'Post An Image'});
});

// If you don't export, nobody can import it :thinking:
module.exports = loginRouter;