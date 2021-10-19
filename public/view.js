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
