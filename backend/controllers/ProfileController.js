import db from "../config/db.js";

export const getProfile = (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT id, username, email, role FROM users WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
};