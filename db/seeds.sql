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