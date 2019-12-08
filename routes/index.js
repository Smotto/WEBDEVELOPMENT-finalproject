var express = require('express');
// const User = require('../routes/users');
var router = express.Router();
// const user = new User();

/* GET home page. */
router.get('/', function(req, res, next)
{
  res.render('index', { title: 'Express' });
});

/* Get Index page*/
router.get('/', (req, res, next) =>
{
	let user = req.session.user;
	if(user)
	{
		res.redirect('/home');
		return;
	}
	res.render('index', { title: 'Express' });
});

/* ET home page */
router.get('/home', (req, res, next) =>
{
	let user = req.session.user;

	if(user)
	{
		res.render('home', {opp:req.session.opp, name:user.fullname});
		return;
	}
	res.redirect('/');
});

/* POST login data */
router.post('/login', (req, res, next) =>
{
	user.login(req.body.username, req.body.password, function(result)
    {
		if(result)
		{
			req.session.user = result;
			req.session.opp = 1;
			res.redirect('/home');
		}
		else
		  {
			res.send('Username/Password is incorrect. Try again');
		  }
	})
});

/* POST register data */
router.post('/registration', (req, res, next) => {
	let userInput = {
		username: req.body.username,
		fullname: req.body.fullname,
		password: req.body.password
	};

	user.create(userInput, function(lastId)
    {
		if(lastId)
		{
			user.find(lastId, function(result)
            {
				req.session.user = result;
				req.session.opp = 0;
				res.redirect('/home');
			});
		}
		else
		  {
			console.log('Could not create a new user');
		  }
	});
});

/* LOGGOUT */
router.get('/Loggout', (req, res, next) =>
{
	if(req.session.user)
	{

    }
	req.session.destroy(function()
    {
		res.redirect('/');
    });
});
module.exports = router;
