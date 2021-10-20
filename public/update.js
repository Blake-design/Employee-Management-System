const mysql = require("mysql2");
require("dotenv").config();
const inquirer = require("inquirer");
const { viewAllEmployees, viewAllRoles } = require("./view.js");

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "company_db",
});

connection.connect((err) => {
  if (err) throw err;
});

const updateRole = (next) => {
  let questions = [
    {
      type: "input",
      message: "Which employee (id) would you like to update?",
      name: "employeeId",
    },
    {
      type: "input",
      message: "What is the new role?",
      name: "role",
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    connection.query(
      "UPDATE employees SET title = ? WHERE em_id = ?",
      [answers.role, answers.employeeId],
      (err) => {
        if (err) throw err;
        console.log(
          "Successfully uodated employee id" +
            answers.employeeId +
            " to " +
            answers.role
        );
        next();
      }
    );
  });
};

module.exports = { updateRole };
