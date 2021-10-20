const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "company_db",
});

connection.connect((err) => {
  if (err) throw err;
});

viewAllRoles = (next) => {
  connection.query("SELECT * FROM employee_role", (err, results) => {
    if (err) throw err;
    console.table(results);
    return next();
  });
};

viewAllDepartments = (next) => {
  connection.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    console.table(results);
    return next();
  });
};

viewAllEmployees = (next) => {
  connection.query("SELECT * FROM employees", (err, results) => {
    if (err) throw err;
    console.table(results);
    return next();
  });
};

module.exports = { viewAllRoles, viewAllDepartments, viewAllEmployees };
