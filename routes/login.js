const express = require('express');
const loginRouter = express.Router();

loginRouter.use((req, res, next) =>
{
    console.log('Login middleware being used.');
    next();
});

loginRouter.get('/', function(req, res)
{
    console.log('login.mustache initialized');
    res.render('login', {title: 'Login'});
});

/* POST login data
router.post('/login', (req, res, next) => {
    user.login(req.body.username, req.body.password, function(result){
        if(result){
            req.session.user = result;
            req.session.opp = 1;
            res.redirect('/home');
        }
        else{
            res.send('Username/Password is incorrect. Try again');
        }
    })
});
*/

// If you don't export, nobody can import it :thinking:
module.exports = loginRouter;