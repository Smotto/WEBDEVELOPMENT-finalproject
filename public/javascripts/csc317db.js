// Requires npm install mysql.
// https://www.w3schools.com/nodejs/nodejs_mysql.asp used as a guideline.
let mysql = require('mysql');
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    // Default Database connection
    database: "csc317db"
});
function createDatabase()
{
    // Maybe we can use the init.sql file here instead of manually launching the script in the terminal.
    connection.query("CREATE DATABASE IF NOT EXISTS csc317db", function (err, result) {
        if (err) throw err;
        console.log("Database created if doesn't exist.");
    });
}
function createUsersTable()
{
    // Creating a table IF NOT EXISTS named "users"
    // id INT AUTO_INCREMENT PRIMARY KEY means it's going to increment by 1 each time a new record is inputted.
    let sql = "CREATE TABLE IF NOT EXISTS `users` (\n" +
        "  `id` int unsigned NOT NULL AUTO_INCREMENT,\n" +
        "  `username` varchar(255) NOT NULL,\n" +
        "  `email` varchar(255) NOT NULL,\n" +
        "  `password` varchar(2048) NOT NULL,\n" +
        "  `active` int NOT NULL DEFAULT '0',\n" +
        "  PRIMARY KEY (`id`),\n" +
        "  UNIQUE KEY `id_UNIQUE` (`id`),\n" +
        "  UNIQUE KEY `username_UNIQUE` (`username`),\n" +
        "  UNIQUE KEY `email_UNIQUE` (`email`)\n" +
        ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Users Table created if doesn't exist.");
    });
}
function createImagePostsTable()
{
    // Creating a table IF NOT EXISTS named "users"
    // id INT AUTO_INCREMENT PRIMARY KEY means it's going to increment by 1 each time a new record is inputted.
    let sql = "CREATE TABLE IF NOT EXISTS `imageposts` (\n" +
        "  `id` int unsigned NOT NULL AUTO_INCREMENT,\n" +
        "  `title` varchar(512) NOT NULL,\n" +
        "  `description` varchar(8096) NOT NULL,\n" +
        "  `fk_userid` int unsigned NOT NULL,\n" +
        "  `active` int unsigned NOT NULL,\n" +
        "  `photopath` varchar(1024) NOT NULL,\n" +
        "  PRIMARY KEY (`id`),\n" +
        "  UNIQUE KEY `postid_UNIQUE` (`id`),\n" +
        "  KEY `id_idx` (`fk_userid`),\n" +
        "  CONSTRAINT `id` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE\n" +
        ") ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Imageposts Table created if doesn't exist.");
    });
}
function createCommentsTable()
{
    // Creating a table IF NOT EXISTS named "users"
    // id INT AUTO_INCREMENT PRIMARY KEY means it's going to increment by 1 each time a new record is inputted.
    let sql = "CREATE TABLE IF NOT EXISTS `comments` (\n" +
        "  `id` int unsigned NOT NULL,\n" +
        "  `comment` varchar(4096) NOT NULL,\n" +
        "  `fk_postid` int unsigned NOT NULL,\n" +
        "  `fk_userid` int unsigned NOT NULL,\n" +
        "  PRIMARY KEY (`id`),\n" +
        "  KEY `userID_idx` (`fk_userid`),\n" +
        "  KEY `postimageID_idx` (`fk_postid`),\n" +
        "  CONSTRAINT `postimageID` FOREIGN KEY (`fk_postid`) REFERENCES `imageposts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,\n" +
        "  CONSTRAINT `userID` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Comments Table created if doesn't exist.");
    });
}
function alterTablePrimaryKeyINCREMENT()
{
    let sql = "ALTER TABLE users ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table altered");
    });
}
function insertRecord(values = "('userTEST', 'emailTest', 'passwordTEST', '0')")
{
    // INSERT IGNORE allows "upsert"
    // There's probably vulnerabilities still here even if we use mysql.escape
    let sql = "INSERT IGNORE INTO users (username, email, password, active) VALUES " + mysql.escape(values);
    connection.query(sql, function (err, result) {
        if (err)
        {
            console.log("User already exists.");
            // TODO: Should send an error back to the front end so the user knows that they can't register.
        }
        else
        {
            console.log("1 record inserted.");
        }
    });
}

function insertMultipleRecords(values = [
    ['userTEST1', 'emailTest1', 'passwordTEST', '0'],
    ['userTEST2', 'emailTest2', 'passwordTEST', '0'],
    ['userTEST3', 'emailTest3', 'passwordTEST', '0'],
    ['userTEST4', 'emailTest4', 'passwordTEST', '0'],
    ['userTEST5', 'emailTest5', 'passwordTEST', '0'],
])
{
    let sql = "INSERT IGNORE INTO users (username, email, password, active) VALUES ?";

    connection.query(sql, [values], function (err, result) {
        if (err)
        {
            console.log("1 or more of these exist already.")
        }
        else
        {
            console.log("Number of records inserted: " + result.affectedRows);
        }
    });
}
function insertCustomerNameAddress(ID = "('Michelle', 'Blue Village 1')")
{
    let sql = "INSERT INTO users (name, address) VALUES " + mysql.escape(ID);
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted, ID: " + result.insertId);
    });
}
function selectAllFromTable()
{
    connection.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        console.log("All Column Data of all Users");
        console.log(result);
    });
}
function selectFirstTwoColumns()
{
    connection.query("SELECT name, address FROM users", function (err, result, fields) {
        if (err) throw err;

        console.log("Name and Addresses of all users.");
        console.log(result);

        console.log("Fields array for the objects.");
        console.log(fields);
    });
}
function selectWithFilter(userName)
{
    connection.query("SELECT * FROM users WHERE username = " + mysql.escape(userName), function (err, result) {
        if (err) throw err;
        console.log("Select with Filter");
        console.log(result);
    });
}
function selectWithFilterWildCard()
{
    // Maybe useful for searching through the database for potential posts.
    // S% means anything starting with S
    connection.query("SELECT * FROM users WHERE username LIKE 'S%'", function (err, result) {
        if (err) throw err;
        console.log("Select With Filter Wild Card");
        console.log(result);
    });
}
function preventSQLInject()
{
    let adr = 'Mountain 21';
    let sql = 'SELECT * FROM users WHERE address = ' + mysql.escape(adr);
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Prevent SQL Injection");
        console.log(result);
    });
}
function preventMultipleSQLInject()
{
    // ? is a placeholder.
    let name = 'Amy';
    let adr = 'Mountain 21';
    let sql = 'SELECT * FROM users WHERE name = ? OR address = ?';
    connection.query(sql, [name, adr], function (err, result) {
        if (err) throw err;
        console.log("Prevent Multiple SQL Injection");
        console.log(result);
    });
}
function sortResult()
{
    // Sort Alphabetically
    connection.query("SELECT * FROM users ORDER BY username", function (err, result) {
        if (err) throw err;
        console.log("Sorting Alphabetically");
        console.log(result);
    });
}
function orderByDesc()
{
    connection.query("SELECT * FROM users ORDER BY name DESC", function (err, result) {
        if (err) throw err;
        console.log("Ordering By Description, Reverse Alphabetically");
        console.log(result);
    });
}
function deleteRecord(record = "userTEST")
{
    let sql = "DELETE FROM users WHERE username = " + mysql.escape(record);
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`Deleting all records that contain ${record}`);
        console.log("Number of records deleted: " + result.affectedRows);
    });
}
function deleteTableIfExists()
{
    let sql = "DROP TABLE IF EXISTS users";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}
function updateTable()
{
    let sql = "UPDATE users SET address = 'Canyon 123' WHERE address = 'Valley 345'";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    });
}
function limitResult()
{
    // Select only the first 5 users.
    let sql = "SELECT * FROM users LIMIT 5";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}
function startFromPosition3LimitResult()
{
    // OFFSET from 1, so 1 + 2 = 3
    let sql = "SELECT * FROM users LIMIT 5 OFFSET 2";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Starting from position 3, a 2 offset from 1. ");
        console.log(result);
    });
}
function shorterVersionOfStartFromPosition3LimitResult()
{
    // Same as LIMIT 5 OFFSET 2
    let sql = "SELECT * FROM users LIMIT 2, 5";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}
function joinTables()
{
    let sql = "SELECT users.name AS user, products.name AS favorite FROM users JOIN products ON users.favorite_product = products.id";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}
function leftJoin()
{
    /*
    SELECT users.name AS user,
    products.name AS favorite
    FROM users
    LEFT JOIN products ON users.favorite_product = products.id
    */
}
function rightJoin()
{
    /*
    SELECT users.name AS user,
    products.name AS favorite
    FROM users
    RIGHT JOIN products ON users.favorite_product = products.id
     */
}
function connectToServer()
{
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected to Database!");
        // createDatabase();
        // createUsersTable();
        // createImagePostsTable();
        // createCommentsTable();

        // insertRecord();
        // insertMultipleRecords();
        // insertCustomerNameAddress();

        selectAllFromTable(); // Shows Columns are name, address, id; Rows are for each customer.
        // selectFirstTwoColumns();
        // selectWithFilter();
        // selectWithFilterWildCard();
        // preventSQLInject();
        // preventMultipleSQLInject();
        // sortResult();
        // orderByDesc();

        // deleteRecord();
        // deleteTableIfExists();

        // updateTable();
        // limitResult();
        // startFromPosition3LimitResult();
        // shorterVersionOfStartFromPosition3LimitResult();

        // joinTables();
    });
}
connectToServer();

