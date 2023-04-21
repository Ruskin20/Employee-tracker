const mysql = require('mysql2'); /* Import and require mysql2*/
require('dotenv').config();


// Connect to SQL server using mysql package.
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Add MySQL username,
        user: 'root',
        // Add MySQL password here
        password: process.env.DB_PASSWORD,
        database: 'employee_tracker'
    },
    // Indicates successful connection to the database
    console.log(`Connected to the employee_tracker database.`)
);

// Exporting the connection for use in other files
module.exports = db;