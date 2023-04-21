DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;

CREATE TABLE department(
id INT  AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL

);


CREATE TABLE role(
id INT  AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,

FOREIGN KEY (department_id)
REFERENCES department(id)
);


CREATE TABLE employee (
id INT  AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT, 


FOREIGN KEY (role_id) REFERENCES role(id),
FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);



INSERT INTO department (name)
VALUES ("Engineering"), -- 1
("Finance"), -- 2 
("Legal"), -- 3
("Sales"); -- 4


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 4),
("Sales Person", 80000, 4),
("Lead engineer", 105000, 1),
("Software Engineer", 101000, 1),
("Financial Advisor", 165000, 2),
("Accountant", 115000, 2),
("Lawyer", 200000, 3),
("Legal Secretary", 153000, 3);


INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ("John", "Doyle",1, NULL ),
("Kevin", "Heart", 2, 1),
("Bryan", "Ramirez", 3, NULL ),
("Ruskin", "Acevedo", 4, 3),
("Kayla", "Jenkins", 5, NULL ),
("Lisa", "Combs", 6, NULL ),
("Andrew", "Tate", 7, NULL ),
("Ashley", "Perez", 8, 7);




