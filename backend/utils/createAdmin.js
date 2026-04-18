import db from "../config/db.js";
import bcrypt from "bcryptjs";

const createDefaultAdmin = async () => {
  const username = "admin";
  const passwordPlain = "admin123";
  const email = "admin@gmail.com";
  const role = "admin";

  try {
    // cek apakah admin sudah ada
    db.query(
      "SELECT * FROM users WHERE username = ? AND role = 'admin'",
      [username],
      async (err, result) => {
        if (err) return console.log("DB Error:", err);

        if (result.length > 0) {
          console.log("✅ Admin sudah ada di database");
        } else {
          // hash password
          const hashPassword = await bcrypt.hash(passwordPlain, 10);

          db.query(
            "INSERT INTO users (username, email, password, role) VALUES (?,?,?,?)",
            [username, email, hashPassword, role],
            (err) => {
              if (err) return console.log(err);

              console.log("\n🔥 DEFAULT ADMIN DIBUAT 🔥");
              console.log("Username :", username);
              console.log("Password :", passwordPlain);
              console.log("=================================\n");
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export default createDefaultAdmin;
