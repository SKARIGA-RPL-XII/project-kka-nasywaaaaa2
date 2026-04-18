// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import permohonanRoutes from "./routes/permohonanRoutes.js"; // Pastikan ini di-import

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// DAFTAR ROUTE
// Gunakan prefix yang sederhana saja
app.use("/api/auth", authRoutes);
app.use("/api/tugas", permohonanRoutes); // Kita pakai /api/tugas

app.get("/", (req, res) => res.send("Backend Aktif!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));