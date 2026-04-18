import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Validasi input kosong
    if (!username || !password) {
      return res.status(400).json({
        message: "Username dan password wajib diisi",
      });
    }

    // 2. Cari user di tabel users (Admin & User ada di sini)
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Username tidak ditemukan" });
    }

    const user = rows[0];

    // 3. Cek password dengan Bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah" });
    }

    // 4. Pastikan Role aman (Lowercase)
    const role = user.role ? user.role.toLowerCase() : "user";

    const secret = process.env.JWT_SECRET || "fallback_secret_123";

    // 5. Buat Token JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username, 
        role: role 
      },
      secret,
      { expiresIn: "1d" }
    );

    // 6. Response Sukses
    res.json({
      message: "Login berhasil",
      token,
      role, // Sangat penting untuk navigasi di Frontend
      user: {
        id: user.id,
        username: user.username,
        role: role
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Semua field wajib diisi",
      });
    }

    // Cek apakah user sudah ada
    const [checkUser] = await db.execute(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (checkUser.length > 0) {
      return res.status(400).json({
        message: "Username atau email sudah digunakan",
      });
    }

    // Hash password sebelum simpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan sebagai 'user' secara default
    await db.execute(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, "user"]
    );

    res.status(201).json({
      message: "Register berhasil",
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      message: "Gagal menyimpan data ke database",
    });
  }
};

// ================= DASHBOARD =================
export const getDashboard = async (req, res) => {
  try {
    // userId didapat dari middleware verifyToken
    const userId = req.user.id; 

    const [rows] = await db.execute(
      "SELECT id, username, email, role FROM users WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json({
      message: "Data dashboard berhasil diambil",
      user: rows[0],
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// ================= CREATE PERMOHONAN =================
export const createPermohonan = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { nama, sarana, tanggal, waktu, deskripsi } = req.body;

    // Validasi input sederhana
    if (!nama || !sarana || !tanggal) {
        return res.status(400).json({ msg: "Data permohonan tidak lengkap" });
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
    console.error("Create Permohonan Error:", error);
    res.status(500).json({
      msg: "Server error saat membuat permohonan"
    });
  }
};