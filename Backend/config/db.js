const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "DCS@root88",
  database: "ats_db"
});

console.log("MySQL Connected");

module.exports = connection;