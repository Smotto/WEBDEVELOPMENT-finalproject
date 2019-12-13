const express = require('express');
const loginRouter = express.Router();
const Account = require ('../routes/users');
const user = new Account();

loginRouter.get('/', function(req, res)
{
    console.log('login.mustache initialized');
    res.render('login');
});

/* POST login data */
loginRouter.post('/', function(req, res, next) {

    console.log('Login Post Request Received');
    console.log( req.body.userName, req.body.passWord, 0);

    user.login(userName, passWord, function(result){
        if(result){
            req.session.user = result;
            console.log(result);
            req.session.opp = 1;
            console.log('Logged in as: '+ req.session.user);
            res.redirect('/index');
        }
        else{
            res.send('Username/Password is incorrect. Try again');
        }
    });
});


module.exports = loginRouter;