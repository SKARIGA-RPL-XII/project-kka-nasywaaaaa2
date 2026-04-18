import { Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-5 rounded-xl">
      
      {/* LEFT : Logo + Title */}
      <div className="flex items-center gap-4">
        
        {/* Logo Container Lebih Besar */}
        <div className="bg-blue-600 text-white p-3 rounded-xl shadow">
          <Building2 size={30} />
        </div>

        {/* Title Lebih Besar */}
        <h1 className="text-xl font-semibold text-gray-700">
          Sistem Informasi Manajemen Permohonan
        </h1>
      </div>

      {/* RIGHT : Logout */}
      <button
        onClick={handleLogout}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-base font-semibold transition"
      >
        Logout
      </button>

    </div>
  );
}
