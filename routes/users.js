const bcrypt = require('bcrypt');
const databaseConnector = require('../routes/databaseConnector');

function Account() {};

Account.prototype = {
    create: function(body, callback)
    {
        body.password = bcrypt.hashSync(body.password, 10);

        var person = [];

        for (prop in body){
            person.push(prop);
        }

        let sql = 'INSERT INTO users(username, email, password) VALUES (?, ?, ?)';

        databaseConnector.query(sql, person, function(err, lastId) {
            if(err) throw err;
            callback(lastId);
        });
    },

    find: function(user = null, callback)
    {
        // if user=ID || user=username
        if(user) {
            var field = Number.isInteger(user) ? 'id' : 'username';
        }

        let sql = 'SELECT * FROM users WHERE ${field} = ?';

        databaseConnector.query(sql, user, function(err, result) {
            if(err) {
                throw err;
            }
            callback(result);
        });
    },

    login: function(username, password, callback)
    {
        this.find(username, function(account) {
            if(account) {
                if(bcrypt.compareSync(password, account.password)){
                    callback(account);
                    return;
                }
            }
            callback(null);

        });
    }
};

module.exports = Account;
