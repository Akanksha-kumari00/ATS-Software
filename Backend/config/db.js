const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Sona@root22",
  database: "ats_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

console.log("MySQL Connected");

module.exports = connection;