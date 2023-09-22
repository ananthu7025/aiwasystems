const mysql = require('mysql2');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'aiwasystems'
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

module.exports = {
  db,
  dbConfig,
  port: 4000
};
