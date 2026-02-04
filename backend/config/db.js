import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_sarpras",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});

export default db;
