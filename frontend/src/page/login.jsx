import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { User, Lock, Loader2, ArrowRight, Building2 } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("auth/login",{
        username,
        password,
      });

      // Ambil data dengan aman
      const token = res?.data?.token;
      const role = res?.data?.role;

      if (!token || !role) {
        alert("Login gagal: token atau role tidak ditemukan");
        return;
      }

      // Paksa role jadi lowercase
      const roleLower = role.toLowerCase();

      // Simpan ke localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", roleLower);

      // Redirect sesuai role
      if (roleLower === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (roleLower === "user") {
        navigate("/user/dashboard", { replace: true });
      } else {
        alert("Role tidak valid");
        localStorage.clear();
        navigate("/", { replace: true });
      }

    } catch (err) {
      console.error("Login error:", err);
      alert(
        err.response?.data?.message ||
        "Username atau password salah / server error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
      <div className="w-full max-w-[440px]">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          
          {/* Header */}
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4">
              <Building2 className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">
              Sistem Informasi
            </h1>
            <p className="text-slate-500 mt-1">
              Manajemen Sarana & Prasarana
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Username */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Username
              </label>
              <div className="relative mt-1">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="relative mt-1">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Masuk
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-400 text-xs mt-6">
          © 2024 SIM Sarana Prasarana
        </p>
      </div>
    </div>
  );
}
