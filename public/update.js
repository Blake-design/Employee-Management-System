const inquirer = require("inquirer");
const app = require("./app.js");
const view = require("./view.js");
const connection = require("./app.js");

exports.updateRole = (update) => {
  view.getAllEmployees(function (employeeResults) {
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
        view.getAllRoles(function (rolesResults) {
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
