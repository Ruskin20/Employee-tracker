const mysql = require('mysql2'); /* Import and require mysql2*/

// Connect to SQL server using mysql package.
const connection = mysql.createConnection(
    {
        host: 'localhost',
        // Add MySQL username,
        user: 'root',
        // Add MySQL password here
        password: 'Prospect#20',
        database: 'employers_db'
    });

connection.connect(function (err) {
    console.log(`Connected to the employers_db database.`)
    if (err) throw err;
});

module.exports = connection;