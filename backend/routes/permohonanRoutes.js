import express from "express";
import { 
    createPermohonan, 
    getUserPermohonan, 
    getDashboardSummary 
} from "../controllers/PermohonanController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Tambahkan verifyToken sebelum nama fungsi controller
router.post("/buat", verifyToken, createPermohonan); 
router.get("/", verifyToken, getUserPermohonan);
router.get("/summary", verifyToken, getDashboardSummary);

export default router;