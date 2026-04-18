import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api"; 
import { User, Lock, Mail, UserPlus, Loader2, ArrowLeft } from "lucide-react";

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    username: "",
    email: "", 
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Validasi Password di Sisi Client
    if (formData.password !== formData.confirmPassword) {
      return alert("Konfirmasi password tidak cocok!");
    }

    setIsLoading(true);

    try {
      /**
       * KONEKSI KE BACKEND:
       * Karena di api.js baseURL kamu adalah "http://localhost:5000/api/auth"
       * Maka di sini cukup panggil "/register" agar menjadi:
       * http://localhost:5000/api/auth/register
       */
      const response = await api.post("/register", {
        username: formData.username,
        email: formData.email, 
        password: formData.password
      });

      // Status 201 adalah standar untuk 'Created'
      if (response.status === 201 || response.status === 200) {
        alert("Registrasi berhasil! Silakan login.");
        navigate("/login");
      }

    } catch (err) {
      console.error("Full Error:", err);
      
      // Menangani error spesifik jika rute salah (404) atau data sudah ada (400)
      const errorStatus = err.response?.status;
      const errorMessage = err.response?.data?.message;

      if (errorStatus === 404) {
        alert("Gagal: Endpoint /api/auth/register tidak ditemukan. Pastikan server sudah di-restart.");
      } else if (errorMessage) {
        alert("Registrasi Gagal: " + errorMessage);
      } else {
        alert("Registrasi Gagal: Terjadi kesalahan pada server.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-indigo-100 p-4">
      <div className="w-full max-w-[480px]">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white p-8 md:p-10">
          
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 mb-4 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <UserPlus className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Buat Akun Baru
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Daftar untuk akses layanan permohonan
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Username */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                </div>
                <input
                  name="username"
                  type="text"
                  required
                  placeholder="Masukkan username"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all duration-200"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Input Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="email@contoh.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all duration-200"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                  </div>
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all duration-200"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Konfirmasi</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                  </div>
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all duration-200"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full group relative flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all duration-300 active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  <span>Memproses...</span>
                </div>
              ) : (
                "Daftar Sekarang"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Sudah memiliki akun?{" "}
              <Link to="/login" className="text-blue-600 font-bold hover:text-blue-700 transition-colors inline-flex items-center gap-1">
                <ArrowLeft size={14} /> Kembali ke Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}