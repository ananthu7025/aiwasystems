const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost", 
    user: "root", 
    password: "",
    database: "aiwasystems",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3306 // Default MySQL port
});

pool.getConnection((err, conn) => {
    if (err) console.error(err);
    console.log("Connected successfully");
    if (conn) {
        conn.release(); // Release the connection back to the pool.
    }
});

// Export the promise-based pool
module.exports = pool.promise();
