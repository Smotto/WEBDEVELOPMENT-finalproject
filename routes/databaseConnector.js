const util = require ('util');
const mysql = require ('mysql');
exports.mysql = mysql;

const databaseConnector = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'csc317db'
});

databaseConnector.getConnection((err, connection) => {
    if(err)
    {
        console.error("Error connecting to database");
    }
    if(connection)
    {
        console.log("Connection to database success!");
        connection.release();
    }
});

databaseConnector.query = util.promisify(databaseConnector.query);

module.exports = databaseConnector;