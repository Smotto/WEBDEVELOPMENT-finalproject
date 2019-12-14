const util = require ('util');
const mysql = require ('mysql');
exports.mysql = mysql;

const databaseConnector = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'csc317db'
});

databaseConnector.getConnection((err, connection) => {
    if(err) {
        console.error("Error connecting to database");
    }
    if(connection) {
        /*
        exports.options = {
            connection: connection,
            // Time to live in seconds.
            ttl: 3600,
            // Interval to destroy expired sessions in seconds.
            reapInterval: 3600,
            reapCallback: function() { console.log('expired sessions were removed');}
        };
         */
        console.log("Connection to database success!");
        connection.release();
    }
});

databaseConnector.query = util.promisify(databaseConnector.query);

module.exports = databaseConnector;