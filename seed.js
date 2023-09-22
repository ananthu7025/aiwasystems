// seed.js
const mysql = require('mysql2');
const { dbConfig } = require('./config'); // Import your database configuration
const seedScript = require('./seed-script'); // Import your seed script

// Create a connection to the database
const connection = mysql.createConnection(dbConfig);

// Execute the seed script
seedScript(connection);

// Close the connection when the script is done
connection.end();
