const bcrypt = require('bcrypt');
const databaseConnector = require('../routes/databaseConnector');
const mysql = databaseConnector.mysql;

function Account() {};

Account.prototype = {
    create: function(body, callback)
    {
        body.password = bcrypt.hashSync(body.password, 10);
        let person = [body.username, body.email, body.password];

        let sql = `INSERT IGNORE INTO users (username, email, password) VALUES (?, ?, ?)`;

        // TODO: If this was inserted into the database, then return a boolean to the end point.

        databaseConnector.query(sql, person, function(err, lastId) {
            if(err) throw err;
            console.log("Last Insert ID: ",lastId.insertId);
            callback(lastId.insertId);
        });

    },

    find: function(user = null, callback)
    {
        // if user = ID || user = username
        if(user) {
            var field = Number.isInteger(user) ? 'id' : 'username';
        }
        let sql = `SELECT * FROM users WHERE ${field} = ?`;

        databaseConnector.query(sql, user, function(err, result) {
            if(err) throw err;
            if(result.length)
            {
                callback(result[0].id);
            }
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
