const bcrypt = require('bcrypt');
const databaseConnector = require('../routes/databaseConnector');

function Account() {};

Account.prototype = {
    create: function(body, callback) {
        body.password = bcrypt.hashSync(body.password, 10);
        let person = [body.username, body.email, body.password];
        let sql = `INSERT IGNORE INTO users (username, email, password) VALUES (?, ?, ?)`;
        databaseConnector.query(sql, person, function(err, lastId) {
            if(err) throw err;
            console.log("Last Insert ID: ",lastId.insertId);
            callback(lastId.insertId);
        });
    },

    find: async function(user = null, callback) {
            try {
                if(user) {
                    let field = Number.isInteger(user) ? 'id' : 'username';
                    let sql = `SELECT * FROM users WHERE ${field} = ?`;
                    // TODO: When I send too many requests, it just stops
                    await databaseConnector.query(sql, user, (err, result) => {
                        console.log("Awaiting...");
                        if(err) throw err;
                        if(result.length) {
                            console.log("Awaiting is finished. Account Found!");
                            callback(result);
                        }
                        else {
                            console.log("Awaiting is finished, couldn't find the account.")
                        }
                    });
                }
            } catch (error)
            {
                console.log(error);
            }
    },

    login: function(username, password, callback) {
        console.log("Account login function activated.");
        this.find(username, function(account) {
            if(account) {
                // && account[0].active !== 1
                if(bcrypt.compareSync(password, account[0].password)) {
                    // TODO: When server fires up, should active be reset?
                    // TODO: Prone to sql injection
                    let sql = `UPDATE users SET active = 1 WHERE username = '${account[0].username}'`;
                    databaseConnector.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log(result.affectedRows + " record(s) updated");
                    });

                    callback(account);
                    return;
                }
            }
            callback(null);
        });
    },

    logout: function(user, callback) {

        let sql = `UPDATE users SET active = 0 WHERE id = ?`;
        databaseConnector.query(sql, user, (err, result) =>{
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            callback(user);
        });
    }
};

module.exports = Account;
