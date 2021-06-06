const mysql = require("mysql");

//local mysql db connection
const dbConn = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "password",
  database: "db",
});

dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;
