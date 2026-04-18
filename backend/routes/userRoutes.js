import express from "express";
import { 
  getDashboardSummary,  
  createPermohonan 
} from "../controllers/UserDashboardController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ================= DASHBOARD =================
router.get("/dashboard", verifyToken, getDashboardSummary);

// ================= CREATE PERMOHONAN =================
// 🔥 INI YANG DIPAKAI FRONTEND POST /api/user/dashboard
router.post("/dashboard", verifyToken, createPermohonan);

export default router;
