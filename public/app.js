const inquirer = require("inquirer");

require("console.table");

const {
  viewAllRoles,
  viewAllDepartments,
  viewAllEmployees,
} = require("./view.js");

const { addEmployee, addDept, addRole } = require("./add.js");

console.log("Welcome to your personal CMS");

const updateRole = (update) => {
  viewAllEmployees(function (employeeResults) {
    console.log("test here:");
    console.log(employeeResults);
    var employees = [];
    for (var i = 0; i < employeeResults.length; i++) {
      var fullName = {
        name:
          employeeResults[i].first_name + " " + employeeResults[i].last_name,
        value: {
          id: employeeResults[i].emp_id,
          firstname: employeeResults[i].first_name,
          lastname: employeeResults[i].last_name,
        },
      };

      employees.push(fullName);
    }

    inquirer
      .prompt([
        {
          type: "list",
          message: "Which employee would you like to update?",
          name: "employee",
          choices: employees,
        },
      ])
      .then((answers) => {
        viewAllRoles(function (rolesResults) {
          var roles = [];
          console.log(answers.employee);

          for (var i = 0; i < rolesResults.length; i++) {
            var fullRole = {
              name: rolesResults[i].title,
              value: {
                id: rolesResults[i].role_id,
                role: rolesResults[i].title,
              },
            };
            roles.push(fullRole);
          }

          inquirer
            .prompt([
              {
                type: "list",
                message: `Which role would you like to update ${answers.employee.firstname} to?`,
                name: "role",
                choices: roles,
              },
            ])
            .then((results) => {
              console.log("results...");
              console.log(results.role);
              connection.query(
                "UPDATE employees SET em_role_id = ? WHERE em_id = ?",
                [results.role.id, answers.employee.id],
                (err) => {
                  if (err) throw err;
                  console.log("Successfully updated " + answers.employee.id);
                  app.start();
                }
              );
            });
        });
      });
  });
};

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
          "update an employee role",
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
        case "Update employee role":
          updateRole();

          break;
      }
    });
}

start();
