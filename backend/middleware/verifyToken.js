import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Token tidak ditemukan, silakan login" });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET || "fallback_secret_123";

  try {
    const decoded = jwt.verify(token, secret);
    
    // Kita simpan ke req.user agar bisa dipakai di controller
    // Menggunakan OR (||) untuk jaga-jaga jika payload-nya berbeda nama
    req.user = {
      id: decoded.userId || decoded.id, 
      email: decoded.email
    };
    
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Sesi berakhir, silakan login ulang" });
  }
};