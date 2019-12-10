const express = require('express');
const postimageRouter = express.Router();

postimageRouter.use((req, res, next) =>
{
    console.log('Postimage middleware being used.');
    next();
});

postimageRouter.get('/', function(req, res)
{
    console.log('postimage.mustache initialized');
    res.render('postimage');
});

postimageRouter.post('/', function(req, res)
{
   console.log("postimage Post request received.")
});

module.exports = postimageRouter;