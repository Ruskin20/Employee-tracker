//Dependencies 
// const express = require('express');

const inquirer = require('inquirer');
const cTable = require('console.table');
// const db = require('./db');

// Init function to load main prompts
init();

function init() {
    mainPrompts();
}

function mainPrompts() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Select an option below',
                name: 'choice',
                choices: [
                    {
                        name: "View all departments",
                        value: "VIEW_DEPARTMENTS"
                    },
                    {
                        name: "View all roles",
                        value: "VIEW_ROLES"
                    },
                    {
                        name: "View all employees",
                        value: "VIEW_EMPLOYEES"
                    },
                    {
                        name: "Add a department",
                        value: "ADD_DEPARTMENT"
                    },
                    {
                        name: "Add a role",
                        value: "ADD_ROLE"
                    },
                    {
                        name: "Add an employee",
                        value: "ADD_EMPLOYEE"
                    },
                    {
                        name: "Update an employee role",
                        value: "UPDATE_EMPLOYEE_ROLE"
                    },
                    {
                        name: "Quit",
                        value: "QUIT"
                    },]
            }
        ]).then(res => {
            let choice = res.choice;


            switch (choice) {
                case "VIEW_DEPARTMENTS":
                    viewDepartments;
                    break;
                case "VIEW_ROLES":
                    viewRoles;
                    break;
                case "VIEW_EMPLOYEES":
                    viewEmployees;
                    break;
                case "ADD_DEPARTMENT":
                    addDepartment;
                    break;
                case "ADD_ROLE":
                    addRole;
                    break;
                case "ADD_EMPLOYEE":
                    addEmployee;
                    break;
                case "UPDATE_EMPLOYEE_ROLE":
                    updateEmployeeRole;
                    break;
                default:
                    quit();
            }
        })
}







// 1) VIEW ALL DEPARTMENTS
// --> table showing department names and department ids


// function viewDepartments() {


// }

// 2)VIEW ALL ROLES
// --> presented with the job title, role id,
// the department that role belongs to, and the salary for that role

// function viewAllRoles() {


// }



// 3) VIEW ALL EMPLOYEES
// --> presented with a formatted table showing employee data,
// including employee ids, first names, last names, job titles,


// function viewAllEmployees() {


// }


// ADD A DEPARTMENT
// --> prompted to enter the name of the department and that
// department is added to the database

// function addDepartment() {


// }


// ADD A ROLE
// -->prompted to enter the name, salary, and department for the
// role and that role is added to the database


// function addRole() {


// }


// ADD AN EMPLOYEE
// --> prompted to enter the employee’s first name, last name,
// role, and manager, and that employee is added to the database

// function addEmployee() {


// }


// UPDATE AN EMPLOYEE ROLE
// --> prompted to select an employee to update and their new
// role and this information is updated in the database


// function updateEmployeeRole() {


// }














// const PORT = process.env.PORT || 3001;
// const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Default response for any other request (Not Found)
// app.use((req, res) => {
//     res.status(404).end();
// });
// // Port Listener
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
