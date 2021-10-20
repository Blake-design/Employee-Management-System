const mysql = require("mysql2");
require("dotenv").config();
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "company_db",
});

connection.connect((err) => {
  if (err) throw err;
});

addEmployee = () => {
  var options = [
    {
      type: "input",
      message: "Employee First Name",
      name: "firstName",
    },
    {
      type: "input",
      message: "Employee Last Name",
      name: "lastName",
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

module.exports = { addEmployee };
