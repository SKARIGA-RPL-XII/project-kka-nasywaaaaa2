const bcrypt = require("bcrypt");
const db = require("../config/db");

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  const [rows] = await db.query(
    "SELECT * FROM admins WHERE username = ?",
    [username]
  );

  if (rows.length === 0) {
    return res.json({ message: "Admin tidak ditemukan" });
  }

  const admin = rows[0];

  const valid = await bcrypt.compare(password, admin.password);

  if (!valid) {
    return res.json({ message: "Password salah" });
  }

  res.json({
    message: "Login berhasil",
    admin: {
      id: admin.id,
      username: admin.username,
      role: admin.role
    }
  });
};
