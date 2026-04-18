import db from "../config/db.js";

export const getDashboard = (req, res) => {
  const statsQuery = `
    SELECT
      COUNT(*) AS total,
      SUM(status='Menunggu') AS menunggu,
      SUM(status='Disetujui') AS disetujui
    FROM permohonan
  `;

  const latestQuery = `
    SELECT id, tanggal, nama, sarana, jumlah, status
    FROM permohonan
    ORDER BY tanggal DESC
    LIMIT 5
  `;

  db.query(statsQuery, (err, stats) => {
    if (err) return res.status(500).json(err);

    db.query(latestQuery, (err2, latest) => {
      if (err2) return res.status(500).json(err2);

      res.json({
        stats: stats[0],
        latest,
      });
    });
  });
};
