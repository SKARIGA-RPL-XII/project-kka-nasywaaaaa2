import { useState } from "react";
import api from "../services/api";
import { Building2, User, Lock } from "lucide-react";

export default function LoginAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { username, password });
      alert("Login berhasil");
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      alert("Username atau password salah");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="text-blue-600" size={40} />
          <div>
            <h1 className="text-lg font-semibold">
              Sistem Informasi Manajemen Permohonan
            </h1>
            <p className="text-sm text-gray-500">
              Sarana dan Prasarana
            </p>
          </div>
        </div>

        {/* Form */}
        <h2 className="text-xl font-semibold mb-4">Login Admin</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="text-sm font-medium">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Username"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="********"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-500">
          Sudah punya akun? <span className="text-blue-600 font-medium">Login</span>
        </p>
      </div>
    </div>
  );
}
