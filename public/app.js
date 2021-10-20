const inquirer = require("inquirer");

require("console.table");

const {
  viewAllRoles,
  viewAllDepartments,
  viewAllEmployees,
} = require("./view.js");

const { addEmployee, addDept, addRole } = require("./add.js");

const { updateRole } = require("./update.js");

console.log("Welcome to your personal CMS");

const next = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to continue?",
        name: "next",
        choices: ["yes", "no"],
      },
    ])
    .then((answer) => {
      console.log(answer.next);
      if (answer.next === "yes") {
        start();
      } else {
        throw new Error("Goodbye :)");
      }
    });
};
function start() {
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
          "update employee role",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.choice) {
        case "view all departments":
          viewAllDepartments(next);

          break;
        case "view all roles":
          viewAllRoles(next);

          break;
        case "view all employees":
          viewAllEmployees(next);

          break;
        case "add a department":
          addDept(next);

          break;
        case "add a role":
          addRole(next);

          break;
        case "add an employee":
          addEmployee(next);

          break;
        case "update employee role":
          updateRole(next);

          break;
      }
    });
}

start();
