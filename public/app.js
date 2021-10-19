const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mijo2011!",
  database: "company_db",
});

connection.connect((err) => {
  if (err) throw err;
  start();
});

console.log("Welcome to your personal CMS");

start = () => {
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
          viewAllDepartments();
          next();
          break;
        case "view all roles":
          viewAllRoles();
          next();
          break;
        case "view all employees":
          viewAllEmployees();
          next();
          break;
        case "add a department":
          addDept();

          break;
        case "add a role":
          addRole();

          break;
        case "add an employee":
          addEmployee();

          break;
        case "Update employee role":
          updateRole();

          break;
      }
    });
};

next = () => {
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

viewAllRoles = () => {
  connection.query("SELECT * FROM employee_role", (err, results) => {
    if (err) throw err;
    return console.table(results);
  });
};

viewAllDepartments = () => {
  connection.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    return console.table(results);
  });
};

viewAllEmployees = () => {
  connection.query("SELECT * FROM employees", (err, results) => {
    if (err) throw err;
    return console.table(results);
  });
};

updateRole = (update) => {
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

addEmployee = () => {
  var options = [
    {
      type: "input",
      message: "Employee First Name",
      name: "firstName",
      default: "joe",
    },
    {
      type: "input",
      message: "Employee Last Name",
      name: "lastName",
      default: "sixpack",
    },
    {
      type: "list",
      message: "Employee Role",
      name: "role",
      choices: [
        "writer",
        "art director",
        "producer",
        "editor",
        "colorist",
        "animation",
        "sound enginer",
        "director",
        "cinematographer",
        "production manager",
      ],
    },
  ];

  inquirer.prompt(options).then((answers) => {
    connection.query(
      "INSERT INTO employees SET ?",
      {
        first_name: answers.firstName,
        last_name: answers.lastName,
        title: answers.role,
      },
      (err) => {
        if (err) throw err;
        console.log(
          "Successfully added " + answers.firstName + " " + answers.lastName
        );
      }
    );
  });
};
