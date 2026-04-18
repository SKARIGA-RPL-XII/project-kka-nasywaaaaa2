import { LayoutDashboard, FileText, BarChart3, User, Building2 } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuClass =
    "flex items-center gap-4 p-4 rounded-xl transition text-base font-medium";

  const activeClass =
    "bg-white/20";

  return (
    <div className="w-72 h-screen bg-gradient-to-b from-blue-700 to-blue-500 text-white p-6">

      {/* === LOGO + TITLE === */}
      <div className="flex items-center gap-4 mb-10">
        <Building2 size={46} className="text-white" />
        <h2 className="text-xl font-semibold leading-snug">
          Sistem Informasi <br />
          Manajemen Permohonan
        </h2>
      </div>

      <nav className="space-y-4">

        {/* Dashboard */}
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${menuClass} ${isActive ? activeClass : "hover:bg-white/20"}`
          }
        >
          <LayoutDashboard size={24} />
          Dashboard
        </NavLink>

        {/* Daftar Permohonan */}
        <NavLink
          to="/admin/permohonan"
          className={({ isActive }) =>
            `${menuClass} ${isActive ? activeClass : "hover:bg-white/20"}`
          }
        >
          <FileText size={24} />
          Daftar Permohonan
        </NavLink>

        {/* Laporan */}
        <NavLink
          to="/admin/laporan"
          className={({ isActive }) =>
            `${menuClass} ${isActive ? activeClass : "hover:bg-white/20"}`
          }
        >
          <BarChart3 size={24} />
          Laporan & Rekap
        </NavLink>

        {/* Profil */}
        <NavLink
          to="/admin/profil"
          className={({ isActive }) =>
            `${menuClass} ${isActive ? activeClass : "hover:bg-white/20"}`
          }
        >
          <User size={24} />
          Profil
        </NavLink>

      </nav>
    </div>
  );
}
