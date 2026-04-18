import db from "../config/db.js";

// ================= GET DASHBOARD SUMMARY =================
export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user?.id_user;

    if (!userId) {
      return res.status(401).json({
        msg: "User tidak valid"
      });
    }

    const [permohonan] = await db.query(
      "SELECT COUNT(*) as total FROM permohonan WHERE id_user = ?",
      [userId]
    );

    res.json({
      total_permohonan: permohonan[0].total || 0
    });

  } catch (error) {
    console.log("Dashboard Summary Error:", error);
    res.status(500).json({
      msg: "Server error dashboard summary"
    });
  }
};

// ================= GET DATA PERMOHONAN USER =================
export const getUserPermohonan = async (req, res) => {
  try {
    const userId = req.user?.id_user;

    if (!userId) {
      return res.status(401).json({
        msg: "User tidak valid"
      });
    }

    const [data] = await db.query(
      "SELECT * FROM permohonan WHERE id_user = ? ORDER BY id DESC",
      [userId]
    );

    res.json(data);

  } catch (error) {
    console.log("Get User Permohonan Error:", error);
    res.status(500).json({
      msg: "Server error get permohonan user"
    });
  }
};

// ================= CREATE PERMOHONAN =================
export const createPermohonan = async (req, res) => {
  try {
    const userId = req.user?.id_user;

    if (!userId) {
      return res.status(401).json({
        msg: "User tidak valid"
      });
    }

    const { nama, sarana, tanggal, waktu, deskripsi } = req.body;

    if (!nama || !sarana || !tanggal || !waktu || !deskripsi) {
      return res.status(400).json({
        msg: "Semua field wajib diisi"
      });
    }

    await db.query(
      `INSERT INTO permohonan
      (id_user, nama, sarana, tanggal, waktu, deskripsi, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        nama,
        sarana,
        tanggal,
        waktu,
        deskripsi,
        "pending"
      ]
    );

    res.status(201).json({
      msg: "Permohonan berhasil dibuat"
    });

  } catch (error) {
    console.log("Create Permohonan Error:", error);
    res.status(500).json({
      msg: "Server error create permohonan"
    });
  }
};
