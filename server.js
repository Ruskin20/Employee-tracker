require('console.table');
const db = require("./db/connection");
// Importing the db module from the file
const inquirer = require('inquirer');
//prompting the user for input 
const promptMsg = {
    viewEmployees: "View All Employees",
    viewDepartments: "View All Departments ",
    viewByManager: "View All Employees By Manager",
    viewByDepartment: "View All Employees By Departments ",
    addNewEmployee: "Add New Employee",
    addNewDepartment: "Add New Department",
    addNewRole: "Add New Role",
    removeEmployee: "Remove An Employee",
    updateRole: "Update Employee Role",
    updateEmployeeManager: "Update Employee Manager",
    viewRoles: "View All Roles",
    exit: "Exit",
};
//This function is used to display a list of prompts, user can select from them and can trigger desired actions.
function prompt() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do next?",
            choices: [
                promptMsg.viewEmployees,
                promptMsg.viewDepartments,
                promptMsg.viewByManager,
                promptMsg.viewByDepartment,
                promptMsg.viewRoles,
                promptMsg.addNewEmployee,
                promptMsg.addNewDepartment,
                promptMsg.addNewRole,
                promptMsg.removeEmployee,
                promptMsg.updateRole,
                promptMsg.exit,
            ],
        })
        .then((answer) => {
            console.log("\n");
            console.log("\n");
            switch (answer.action) {
                case promptMsg.viewEmployees:
                    viewEmployees();
                    break;

                case promptMsg.viewDepartments:
                    viewDepartments();
                    break;

                case promptMsg.viewByManager:
                    viewByManager();
                    break;

                case promptMsg.viewByDepartment:
                    viewByDepartment();
                    break;

                case promptMsg.addNewEmployee:
                    addNewEmployee();
                    break;


                case promptMsg.addNewDepartment:
                    addNewDepartment();
                    break;
                case promptMsg.addNewRole:
                    addNewRole();
                    break;

                case promptMsg.removeEmployee:
                    remove("delete");
                    break;

                case promptMsg.updateRole:
                    remove("role");
                    break;

                case promptMsg.viewRoles:
                    viewRoles();
                    break;

                default:
                    db.end();

            }
        });
}
// Function to view all employees from the database.
function viewEmployees() {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name 
    AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employee LEFT JOIN role on employee.role_id = role.id 
    LEFT JOIN department on role.department_id = department.id 
    LEFT JOIN employee manager on manager.id = employee.manager_id;`;
    db.query(query, (err, res) => {
        if (err) throw err;

        console.log("VIEWING ALL EMPLOYEES");

        console.table(res);
        prompt();
    });
}

// Function that displays departments
function viewDepartments() {
    const query = `SELECT * FROM department
    `;
    db.query(query, (err, res) => {
        if (err) throw err;

        console.log("VIEWING ALL DEPARTMENTS");

        console.table(res);
        prompt();
    });
}

// Function to view employees by manager
function viewByManager() {
    const query = `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, department.name AS department, employee.id, employee.first_name, employee.last_name, role.title
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id && employee.manager_id != 'NULL')
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY manager;`;
    db.query(query, (err, res) => {
        if (err) throw err;

        console.log("VIEWING EMPLOYEES BY MANAGER");

        console.table(res);
        prompt();
    });
};

// Function to view employees by dept
function viewByDepartment() {
    const query = `SELECT department.name AS department, role.title, employee.id, employee.first_name, employee.last_name
      FROM employee
      LEFT JOIN role ON (role.id = employee.role_id)
      LEFT JOIN department ON (department.id = role.department_id)
      ORDER BY department.name;`;
    db.query(query, (err, res) => {
        if (err) throw err;

        console.log("VIEWING EMPLOYEES BY DEPARTMENT");

        console.table(res);
        prompt();
    });
};

//function to view all roles
function viewRoles() {
    const query = `SELECT role.id, role.title, department.name, role.salary FROM role INNER JOIN department ON role.department_id = department.id`;
    db.query(query, (err, res) => {
        if (err) throw err;

        console.log("VIEWING ROLES");

        console.table(res);
        prompt();
    });
}

// function(Prompt) to add a worker to a department
function askName() {
    return [
        {
            name: "first",
            type: "input",
            message: "Enter the first name: ",
        },
        {
            name: "last",
            type: "input",
            message: "Enter the last name: ",
        },
    ];
}

//Function to add an employee
async function addNewEmployee() {
    const addName = await inquirer.prompt(askName());

    //Ask user for first and last name
    db.query(
        "SELECT role.id, role.title FROM role ORDER BY role.id;",
        async (err, res) => {
            if (err) throw err;
            const { role } = await inquirer.prompt([
                {
                    name: "role",
                    type: "list",
                    choices: () => res.map((res) => res.title),
                    message: "What is the employee's role?: ",
                },
            ]);
            let roleId;
            for (const row of res) {
                if (row.title === role) {
                    roleId = row.id;
                    continue;
                }
            }
            db.query("SELECT * FROM employee", async (err, res) => {
                if (err) throw err;
                let choices = res.map((res) => `${res.first_name} ${res.last_name}`);
                choices.push("none");
                let { manager } = await inquirer.prompt([
                    {
                        name: "manager",
                        type: "list",
                        choices: choices,
                        message: "Choose the employee's Manager: ",
                    },
                ]);
                let managerId;
                let managerName;
                if (manager === "none") {
                    managerId = null;
                } else {
                    for (const data of res) {
                        data.fullName = `${data.first_name} ${data.last_name}`;
                        if (data.fullName === manager) {
                            managerId = data.id;
                            managerName = data.fullName;
                            console.log(managerId);
                            console.log(managerName);
                            continue;
                        }
                    }
                }
                console.log(
                    "Employee has been added."
                );
                db.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: addName.first,
                        last_name: addName.last,
                        role_id: roleId,
                        manager_id: parseInt(managerId),
                    },
                    (err, res) => {
                        if (err) throw err;
                        prompt();
                    }
                );
            });
        }
    );
}


addNewDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'dept',
                message: 'What is the name of the department?',
            }
        ])
        .then((response) => {
            db.query(`INSERT INTO department (name) VALUES ('${response.dept}')`, function (err, results) {
                if (err) {
                    console.log(err)
                } else {
                    console.table(results)
                    prompt()
                }
            })
        })
};

function addNewRole() {
    db.promise().query("SELECT * FROM department;")
        .then((res) => {
            //Builds an array of departments
            let departments = res[0].map((department) => {
                return {
                    value: department.id,
                    name: department.name
                }

            })
            inquirer.prompt([
                {
                    type: "input",
                    name: "title",
                    message: "Enter the new role's title"
                },
                {
                    type: "input",
                    name: "salary",
                    message: "Enter the new role's salary"
                },

                {
                    type: "list",
                    name: "department",
                    message: "please select a department",
                    choices: departments
                }

            ]).then((res) => {
                db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ("${res.title}", "${res.salary}", "${res.department}")`)
                    .then(() => {
                        viewRoles()
                    })

            })

        })
}

function remove(input) {
    const promptQuestion = {
        yes: "Yes",
        no: "No I don't (view all employees on the main option).",
    };
    inquirer
        .prompt([
            {
                name: "action",
                type: "list",
                message:
                    "In order to delete an employee, the ID number must be entered. View all employees to get" +
                    " the employee ID. Do you know the employee ID?",
                choices: [promptQuestion.yes, promptQuestion.no],
            },
        ])
        .then((answer) => {

            if (input === "delete" && answer.action === "Yes") removeEmployee();
            else if (input === "role" && answer.action === "Yes") updateRole();
            else viewEmployees();
        });
}

async function removeEmployee() {
    const answer = await inquirer.prompt([
        {
            name: "first",
            type: "input",
            message: "Enter the employee's ID you want to remove:  ",
        },
    ]);

    db.query(
        "DELETE FROM employee WHERE ?",
        {
            id: answer.first,
        },
        function (err) {
            if (err) throw err;
        }
    );
    console.log("You have removed the employee from the system. Thank You");
    console.log('\n')
    prompt();
}

function askId() {
    return [
        {
            name: "name",
            type: "input",
            message: "What is the employee's ID?:  ",
        },
    ];
}

// Function to update Roles
async function updateRole() {
    const employeeId = await inquirer.prompt(askId());

    db.query(
        "SELECT role.id, role.title FROM role ORDER BY role.id;",
        async (err, res) => {
            if (err) throw err;
            const { role } = await inquirer.prompt([
                {
                    name: "role",
                    type: "list",
                    choices: () => res.map((res) => res.title),
                    message: "What is the new employee's role?: ",
                },
            ]);
            let roleId;
            for (const row of res) {
                if (row.title === role) {
                    roleId = row.id;
                    continue;
                }
            }
            db.query(
                `UPDATE employee 
        SET role_id = ${roleId}
        WHERE employee.id = ${employeeId.name}`,
                async (err, res) => {
                    if (err) throw err;
                    console.log("Role has been updated. Thank you");
                    prompt();
                }
            );
        }
    );
}

prompt();




