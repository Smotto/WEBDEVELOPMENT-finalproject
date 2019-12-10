const express = require('express');
const indexRouter = express.Router();

indexRouter.get('/', (req, res) =>
{
	res.render('index', {title: 'Home'});
});
indexRouter.get('/index', (req, res) =>
{
	res.redirect('/');
});

/* Get Index page
indexRouter.get('/', (req, res, next) =>
{
	let user = req.session.user;
	if(user)
	{
		res.redirect('/home');
		return;
	}
	res.render('index', { title: 'Express' });
});
*/
/* ET home page
indexRouter.get('/home', (req, res, next) =>
{
	let user = req.session.user;

	if(user)
	{
		res.render('home', {opp:req.session.opp, name:user.fullname});
		return;
	}
	res.redirect('/');
});
*/

/* POST login data
indexRouter.post('/login', (req, res, next) =>
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
 */


/* POST register data
indexRouter.post('/registration', (req, res, next) => {
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
 */


/* LOGOUT
indexRouter.get('/Logout', (req, res, next) =>
{
	if(req.session.user)
	{

    }
	req.session.destroy(function()
    {
		res.redirect('/');
    });
});
 */

module.exports = indexRouter;
