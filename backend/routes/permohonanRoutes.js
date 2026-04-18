import express from "express";
import {
  getAllPermohonan,
  getDetailPermohonan,
  updateStatusPermohonan
} from "../controllers/PermohonanController.js";

import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
================================
 PERMOHONAN ROUTES (ADMIN ONLY)
================================
*/

// GET semua permohonan (table daftar permohonan)
router.get("/", verifyToken, adminOnly, getAllPermohonan);

// GET detail permohonan (halaman detail)
router.get("/:id", verifyToken, adminOnly, getDetailPermohonan);

// UPDATE status permohonan (approve / reject)
router.put("/:id", verifyToken, adminOnly, updateStatusPermohonan);

export default router;
