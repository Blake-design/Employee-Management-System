const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");
require("dotenv").config();
const {
  viewAllDepartments,
  viewAllEmployees,
  viewAllRoles,
} = require("./view.js");
const { addEmployee } = require("./add.js");
const { updateRole } = require("./update.js");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mijo2011!",
  database: "company_db",
});

db.connect((err) => {
  if (err) throw err;
});

console.log("Welcome to your personal CMS");

inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do today?",
      name: "choice",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
      ],
    },
  ])
  .then((answer) => {
    if (answer.choice === "view all departments") {
      view.viewAllDepartments();
    }
    if (answer.choice === "view all roles") {
      view.viewAllRoles();
    }
    if (answer.choice === "view all employees") {
      view.viewAllEmployees();
    }
    if (answer.choice === "add a department") {
      add.addEmployee();
    }
    if (answer.choice === "add a role") {
      add.addEmployee();
    }
    if (answer.choice === "add an employee") {
      add.addEmployee();
    }
    if (answer.choice === "Update employee role") {
      update.updateRole();
    }
  });
