const mysql = require('mysql2');
const { dbConfig } = require('./config');

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

module.exports = db;
