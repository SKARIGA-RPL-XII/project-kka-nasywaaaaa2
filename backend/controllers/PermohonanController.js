import db from "../config/db.js";

/*
==============================
DASHBOARD SUMMARY
==============================
*/
export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const [total] = await db.query(
      "SELECT COUNT(*) as total FROM permohonan WHERE id_user = ?",
      [userId]
    );

    const [pending] = await db.query(
      "SELECT COUNT(*) as total FROM permohonan WHERE id_user = ? AND status_permohonan = 'menunggu'",
      [userId]
    );

    const [approved] = await db.query(
      "SELECT COUNT(*) as total FROM permohonan WHERE id_user = ? AND status_permohonan = 'disetujui'",
      [userId]
    );

    res.json({
      total: total[0].total,
      pending: pending[0].total,
      approved: approved[0].total
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


/*
==============================
GET LIST PERMOHONAN USER
==============================
*/
export const getUserPermohonan = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.query(
      `SELECT 
        id_permohonan,
        tanggal_permohonan,
        nama_fasilitas,
        status_permohonan
      FROM permohonan 
      WHERE id_user = ?
      ORDER BY tanggal_permohonan DESC`,
      [userId]
    );

    res.json(rows);

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


/*
==============================
CREATE PERMOHONAN
==============================
*/
export const createPermohonan = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      sarana,
      tanggal,
      deskripsi
    } = req.body;

    await db.query(
      `INSERT INTO permohonan
      (id_user, jenis_layanan, nama_fasilitas, tanggal_permohonan, keterangan, status_permohonan)
      VALUES (?, ?, ?, ?, ?, 'menunggu')`,
      [
        userId,
        sarana,   // jenis_layanan
        sarana,   // nama_fasilitas
        tanggal,
        deskripsi || null
      ]
    );

    res.status(201).json({
      msg: "Permohonan berhasil dikirim!"
    });

  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({
      msg: "Gagal menyimpan data: " + error.message
    });
  }
};