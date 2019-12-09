const express = require('express');
const viewpostRouter = express.Router();

viewpostRouter.use((req, res, next) =>
{
    console.log('middleware being used');
    next();
});

viewpostRouter.get('/', function(req, res)
{
    console.log('viewpost.mustache initialized');
    res.render('viewpost', {title: 'Post Viewer'});
});

// If you don't export, nobody can import it :thinking:
module.exports = viewpostRouter;