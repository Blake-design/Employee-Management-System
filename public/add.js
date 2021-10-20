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

const addEmployee = (next) => {
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
      type: "input",
      message: "Employee Role",
      name: "role",
    },
    {
      type: "input",
      message: "Employee Role ID",
      name: "roleID",
    },
    {
      type: "input",
      message: "Department ID",
      name: "deptID",
    },
    {
      type: "input",
      message: "Who is thier manager?",
      name: "manager",
    },
  ];

  inquirer.prompt(options).then((answers) => {
    connection.query(
      "INSERT INTO employees SET ?",
      {
        first_name: answers.firstName,
        last_name: answers.lastName,
        title: answers.role,
        role_id: answers.roleID,
        dept_id: answers.deptID,
        manager: answers.manager,
      },
      (err) => {
        if (err) throw err;
        console.log(
          "Successfully added " + answers.firstName + " " + answers.lastName
        );
        next();
      }
    );
  });
};

const addDept = (next) => {
  var question = [
    {
      type: "input",
      message: "what department would you like to add?",
      name: "dept_name",
    },
  ];

  inquirer.prompt(question).then((answers) => {
    connection.query(
      "INSERT INTO department SET ?",
      {
        dept_name: answers.dept_name,
      },
      (err) => {
        if (err) throw err;
        console.log("Successfully added " + answers.dept_name);
      }
    );
    next();
  });
};

const addRole = (next) => {
  var questions = [
    {
      type: "input",
      message: "what role would you like to add?",
      name: "role",
    },
    {
      type: "input",
      message: "what is the salary of the role?",
      name: "salary",
    },
    {
      type: "input",
      message: "what is the department ID",
      name: "dept_id",
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    connection.query(
      "INSERT INTO employee_role SET ?",
      {
        title: answers.role,
        salary: answers.salary,
        dept_id: answers.dept_id,
      },
      (err) => {
        if (err) throw err;
        console.log("Successfully added " + answers.role);
      }
    );
    next();
  });
};

module.exports = { addEmployee, addDept, addRole };
