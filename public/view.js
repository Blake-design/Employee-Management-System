require("console.table");

exports.viewAllEmployees = (view) => {
  var queryString =
    "SELECT e.em_id, e.first_name, e.last_name, title, salary, dept_name, " +
    "e2.first_name AS manager_first_name, e2.last_name AS manager_last_name " +
    "FROM employees AS E " +
    "JOIN company_role AS C ON E.em_role_id = c.role_id " +
    "JOIN department AS D ON C.dept_id = d.dept_id " +
    "LEFT JOIN employees AS E2 ON E.manager_id = E2.emp_id;";

  db.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
  });
};

exports.getAllRoles = (cb) => {
  db.query("SELECT * FROM company_role", (err, results) => {
    if (err) throw err;
    cb(results);
  });
};

exports.getAllDepartments = (cb) => {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    cb(results);
  });
};

exports.getAllEmployees = (cb) => {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) throw err;
    cb(results);
  });
};
