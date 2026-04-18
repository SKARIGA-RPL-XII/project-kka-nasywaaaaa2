import express from "express";
import { 
  login, 
  registerUser, 
  getDashboard,
  createPermohonan
} from "../controllers/authControllers.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", registerUser);

// Dashboard GET
router.get("/user/dashboard", verifyToken, getDashboard);

// ⭐ TAMBAHAN → CREATE PERMOHONAN
router.post("/user/dashboard", verifyToken, createPermohonan);

export default router;
