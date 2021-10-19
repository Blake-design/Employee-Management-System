

INSERT INTO department (dept_name) 
    VALUES ("pre-production"),("post-production"), ('management')
    ;

INSERT INTO employee_role (title, salary, dept_id)
    VALUES 
        ('writer', 50, 1),
        ('art director', 60, 1),
        ('producer', 60, 3),
        ('editor', 70, 2),
        ('colorist', 80, 2),
        ('animation', 80, 2),                
        ('sound enginer', 70, 2),
        ('director', 150, 3),
        ('cinematographer', 100, 1),
        ('production manager', 120, 3)
    ;
INSERT INTO employees (first_name, last_name, em_role_id) 
    VALUES
        ('George', 'Orwell', 1),
        ('Steve', 'Bannon', 3),
        ('Steven', 'Miller', 8);