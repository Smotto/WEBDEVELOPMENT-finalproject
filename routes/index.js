const express = require('express');
const Account = require('../routes/users');
const router = express.Router();


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

module.exports = router;