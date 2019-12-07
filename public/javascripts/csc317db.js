// Requires npm install mysql.
// https://www.w3schools.com/nodejs/nodejs_mysql.asp used as a guideline.
let mysql = require('mysql');
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    // Default Database connection
    database: "csc317db"
});
function createDatabase()
{
    // Maybe we can use the init.sql file here instead of manually launching the script in the terminal.
    con.query("CREATE DATABASE IF NOT EXISTS csc317db", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
}
function createTable()
{
    // Creating a table IF NOT EXISTS named "customers"
    // id INT AUTO_INCREMENT PRIMARY KEY means it's going to increment by 1 each time a new record is inputted.
    let sql = "CREATE TABLE IF NOT EXISTS customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
}
function alterTablePrimaryKeyINCREMENT()
{
    // Can't figure out a way for it to add a column if it does not exist already.
    let sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table altered");
    });
}
function insertRecord()
{
    let sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
}

function insertMultipleRecords()
{
    let sql = "INSERT INTO customers (name, address) VALUES ?";
    let values = [
        ['John', 'Highway 71'],
        ['Peter', 'Lowstreet 4'],
        ['Amy', 'Apple st 652'],
        ['Hannah', 'Mountain 21'],
        ['Michael', 'Valley 345'],
        ['Sandy', 'Ocean blvd 2'],
        ['Betty', 'Green Grass 1'],
        ['Richard', 'Sky st 331'],
        ['Susan', 'One way 98'],
        ['Vicky', 'Yellow Garden 2'],
        ['Ben', 'Park Lane 38'],
        ['William', 'Central st 954'],
        ['Chuck', 'Main Road 989'],
        ['Viola', 'Sideway 1633']
    ];
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
}
function insertCustomerNameAddress(ID = "('Michelle', 'Blue Village 1')")
{
    let sql = `INSERT INTO customers (name, address) VALUES ${ID}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted, ID: " + result.insertId);
    });
}
function selectAllFromTable()
{
    con.query("SELECT * FROM customers", function (err, result, fields) {
        if (err) throw err;
        console.log("All Column Data of all Customers");
        console.log(result);
    });
}
function selectFirstTwoColumns()
{
    con.query("SELECT name, address FROM customers", function (err, result, fields) {
        if (err) throw err;

        console.log("Name and Addresses of all customers.");
        console.log(result);

        console.log("Fields array for the objects.");
        console.log(fields);
    });
}
function selectWithFilter()
{
    con.query("SELECT * FROM customers WHERE address = 'Park Lane 38'", function (err, result) {
        if (err) throw err;
        console.log("Select with Filter");
        console.log(result);
    });
}
function selectWithFilterWildCard()
{
    // Maybe useful for searching through the database for potential posts.
    // S% means anything starting with S
    con.query("SELECT * FROM customers WHERE address LIKE 'S%'", function (err, result) {
        if (err) throw err;
        console.log("Select With Filter Wild Card");
        console.log(result);
    });
}
function preventSQLInject()
{
    let adr = 'Mountain 21';
    let sql = 'SELECT * FROM customers WHERE address = ' + mysql.escape(adr);
    con.query(sql, function (err, result) {
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
    let sql = 'SELECT * FROM customers WHERE name = ? OR address = ?';
    con.query(sql, [name, adr], function (err, result) {
        if (err) throw err;
        console.log("Prevent Multiple SQL Injection");
        console.log(result);
    });
}
function sortResult()
{
    // Sort Alphabetically
    con.query("SELECT * FROM customers ORDER BY name", function (err, result) {
        if (err) throw err;
        console.log("Sorting Alphabetically");
        console.log(result);
    });
}
function orderByDesc()
{
    con.query("SELECT * FROM customers ORDER BY name DESC", function (err, result) {
        if (err) throw err;
        console.log("Ordering By Description, Reverse Alphabetically");
        console.log(result);
    });
}
function deleteRecord()
{
    let record = "Park Lane 38";
    let sql = `DELETE FROM customers WHERE address = '${record}'`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`Deleting all record that contain ${record}`);
        console.log("Number of records deleted: " + result.affectedRows);
    });
}
function deleteTableIfExists()
{
    let sql = "DROP TABLE IF EXISTS customers";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}
function updateTable()
{
    let sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    });
}
function limitResult()
{
    // Select only the first 5 customers.
    let sql = "SELECT * FROM customers LIMIT 5";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}
function startFromPosition3LimitResult()
{
    // OFFSET from 1, so 1 + 2 = 3
    let sql = "SELECT * FROM customers LIMIT 5 OFFSET 2";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Starting from position 3, a 2 offset from 1. ");
        console.log(result);
    });
}
function shorterVersionOfStartFromPosition3LimitResult()
{
    // Same as LIMIT 5 OFFSET 2
    let sql = "SELECT * FROM customers LIMIT 2, 5";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}
function joinTables()
{
    let sql = "SELECT users.name AS user, products.name AS favorite FROM users JOIN products ON users.favorite_product = products.id";
    con.query(sql, function (err, result) {
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
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected to Database!");
        // createDatabase();
        // createTable();

        // insertRecord();
        // insertMultipleRecords();
        // insertCustomerNameAddress();

        // selectAllFromTable(); // Shows Columns are name, address, id; Rows are for each customer.
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

