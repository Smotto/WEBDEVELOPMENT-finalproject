const express = require('express');
const Account = require('../routes/users');
const router = express.Router();
const User = new Account();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
/* GET home page. */
router.get('/index', function(req, res, next) {
    res.redirect('/');
});

/* Get Index page
router.get('/', (req, res, next) => {
    let user = req.session.user;
    if(user){
        res.redirect('/home');
        return;
    }
    res.render('index', { title: 'Express' });
});
*/
/* GET home page
router.get('/home', (req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('home', {opp:req.session.opp, name:user.fullname});
        return;
    }
    res.redirect('/');
});
*/

/* LOGOUT
router.get('/logout', (req, res, next) => {
    if(req.session.user){
        req.session.destroy(function(){
            res.redirect('/');
        });
    }
});
*/

/* POST register data
router.post('/registration', function(request, response)
{
    console.log("Registration Post Request Received.");
    console.log(request.body.userName, request.body.email, request.body.passWord, 0);
    let userInput = {
        username: request.body.userName,
        email: request.body.email,
        password: request.body.passWord
    };

    // TODO: Fix error
    // Not a routing issue
    User.create(userInput, function(lastId) {
        if(lastId) {
            User.find(lastId, function(result) {
                console.log("result: ", result);
                console.log("Checkpoints 1");
                request.session.user = result;
                console.log("Checkpoints 2");
                request.session.opp = 0;
                console.log("Checkpoints 3");
                response.redirect('/index');
            });
        }
        else {
            console.log('Could not create a new user');
        }
    });
});
 */

module.exports = router;