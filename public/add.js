const view = require("./view.js");
const connection = require("./app.js");

exports.addEmployee = (add) => {
  view.getAllRoles((rolesResults) => {
    var roles = [];
    for (var i = 0; i < rolesResults.length; i++) {
      roles.push(rolesResults[i].title);
    }
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
        choices: roles,
      },
    ];

    inquirer.prompt(options).then((answers) => {
      var roleId = null;
      for (var i = 0; i < rolesResults.length; i++) {
        if (rolesResults[i].title === answers.role) {
          roleId = rolesResults[i].role_id;
        }
      }
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          em_role_id: roleId,
        },
        (err) => {
          if (err) throw err;
          console.log(
            "Successfully added " + answers.firstName + " " + answers.lastName
          );
        }
      );
    });
  });
};
