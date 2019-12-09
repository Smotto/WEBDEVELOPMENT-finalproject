var express = require('express');
var router = express.Router();
// const User = require('../routes/users');
// const user = new User();

/* GET users listing. */
router.get('/', function(req, res)
{
    res.send('respond with a resource');
});

/*
User.prototype = {
	//finding user data w/ ID or username
	find: function(user = null, callback)
	{
		// if user=ID || user=username
		if(user)
		{
			var field = Number.isInteger(user) ? 'id' : 'username';
		}

		let sql = 'SELECT * FROM users WHERE ${field} = ?';

		pool.query(sql, user, function(err, result)
        {
			if(err) throw err;
			callback(result);
		});
	},

}
*/

module.exports = router;
