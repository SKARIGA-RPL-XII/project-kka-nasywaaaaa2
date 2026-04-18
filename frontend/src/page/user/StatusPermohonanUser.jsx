import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  LayoutDashboard,
  FileText,
  User,
  LogOut,
  ClipboardList,
  Bell,
  Search,
  Filter,
  Calendar,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// ================= SIDEBAR =================
function Sidebar() {
  const location = useLocation();
  
  // Tambahkan item menu Status di sini
  const menuItems = [
    { path: "/user/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/user/permohonan/baru", icon: ClipboardList, label: "Buat Permohonan" },
    { path: "/user/permohonan", icon: FileText, label: "Status Permohonan" }, // Menu Status
    { path: "/user/profil", icon: User, label: "Profil" },
  ];

  return (
    <div className="w-72 bg-slate-900 text-slate-300 p-6 flex flex-col min-h-screen border-r border-slate-800">
      <div className="flex items-center gap-4 mb-12 px-2">
        <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-500/20">
          <ClipboardList size={28} className="text-white" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-black tracking-tighter text-white leading-none">SIMPSP</h2>
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">Management System</span>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          // Logika isActive agar menu menyala saat dikunjungi
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <div className={`flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 group ${
                isActive 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                : "hover:bg-slate-800 hover:text-white"
              }`}>
                <item.icon size={20} className={isActive ? "text-white" : "text-slate-400 group-hover:text-blue-400"} />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

// ================= NAVBAR =================
function Navbar() {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100 px-8 flex justify-between items-center">
      <div>
        <h1 className="text-sm font-medium text-gray-500 uppercase tracking-widest">Riwayat</h1>
        <p className="text-xl font-bold text-gray-900">Status Permohonan</p>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-gray-400 hover:text-blue-600 transition-colors"><Bell size={20} /></button>
        <div className="h-8 w-[1px] bg-gray-200"></div>
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">U</div>
            <span className="text-sm font-bold text-slate-700">User</span>
        </div>
      </div>
    </header>
  );
}

// ================= HALAMAN UTAMA =================
export default function StatusPermohonan() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");
    try {
      const res = await api.get("/user/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data?.permohonan || []);
    } catch (err) {
      console.error("Gagal ambil data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-8 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Daftar Pengajuan</h2>
              <p className="text-slate-500 mt-1">Pantau progres permohonan sarana Anda.</p>
            </div>
            <Link to="/user/permohonan/baru" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all flex items-center gap-2">
              + Buat Permohonan
            </Link>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6">Sarana</th>
                  <th className="px-8 py-6">Tanggal</th>
                  <th className="px-8 py-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr><td colSpan="4" className="text-center py-20">Memuat...</td></tr>
                ) : data.length === 0 ? (
                  <tr><td colSpan="4" className="text-center py-20 text-slate-400 italic">Belum ada data.</td></tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6"><StatusBadge status={item.status} /></td>
                      <td className="px-8 py-6 font-bold">{item.sarana}</td>
                      <td className="px-8 py-6 text-slate-500 text-sm font-medium">{item.tanggal}</td>
                      <td className="px-8 py-6 text-center">
                        <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    menunggu: "bg-amber-50 text-amber-600 border-amber-100",
    disetujui: "bg-emerald-50 text-emerald-600 border-emerald-100",
    ditolak: "bg-rose-50 text-rose-600 border-rose-100",
  };
  return (
    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black border uppercase tracking-widest ${styles[status] || "bg-slate-100"}`}>
      {status}
    </span>
  );
}