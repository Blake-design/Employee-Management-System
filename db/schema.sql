DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
  dept_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30) NOT NULL
);

DROP TABLE IF EXISTS employee_role;
CREATE TABLE employee_role (
  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary VARCHAR(30) NOT NULL,
   dept_id INT,
    PRIMARY KEY (role_id),
    FOREIGN KEY (dept_id)
     REFERENCES department(dept_id)
);

DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
  em_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  em_role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (em_id),
    FOREIGN KEY (em_role_id) REFERENCES employee_role(role_id)
);

