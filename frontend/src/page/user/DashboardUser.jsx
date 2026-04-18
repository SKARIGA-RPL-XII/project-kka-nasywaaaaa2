import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  LayoutDashboard,
  FileText,
  User,
  LogOut,
  ClipboardList,
  Clock,
  CheckCircle,
  Bell,
  ChevronRight,
  Search
} from "lucide-react";

// ================= SIDEBAR =================
function Sidebar() {
  const location = useLocation();
  const menuItems = [
    { path: "/user/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/user/permohonan/baru", icon: ClipboardList, label: "Buat Permohonan" },
    { path: "/user/permohonan", icon: FileText, label: "Status Permohonan" },
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
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <div className={`flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 group ${
                isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" : "hover:bg-slate-800 hover:text-white"
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
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100 px-8 flex justify-between items-center">
      <div>
        <h1 className="text-sm font-medium text-gray-500 uppercase tracking-widest">Overview</h1>
        <p className="text-xl font-bold text-gray-900">Dashboard Panel</p>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-gray-400 hover:text-blue-600 transition-colors"><Bell size={20} /></button>
        <div className="h-8 w-[1px] bg-gray-200"></div>
        <button onClick={handleLogout} className="group flex items-center gap-2 bg-slate-50 text-slate-600 px-5 py-2.5 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all border border-slate-200">
          <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
          <span className="font-semibold text-sm">Keluar</span>
        </button>
      </div>
    </header>
  );
}

// ================= DASHBOARD USER =================
export default function DashboardUser() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, menunggu: 0, disetujui: 0 });
  const [loading, setLoading] = useState(true);

 // Data Sarana Spesifik dengan Link Gambar Baru yang Lebih Stabil
  const daftarSarana = [
    { 
      nama: "Kabel HDMI/VGA", 
      kategori: "Aksesoris", 
      img: "https://images.pexels.com/photos/2582928/pexels-photo-2582928.jpeg?auto=compress&cs=tinysrgb&w=400" 
    },
    { 
      nama: "Monitor LCD", 
      kategori: "Elektronik", 
      img: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=400" 
    },
    { 
      nama: "Ruang Rapat", 
      kategori: "Ruangan", 
      img: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=400" 
    },
    { 
      nama: "Proyektor HD", 
      kategori: "Elektronik", 
      img: "https://images.pexels.com/photos/7100341/pexels-photo-7100341.jpeg?auto=compress&cs=tinysrgb&w=400" 
    },
    { 
      nama: "Sound System", 
      kategori: "Audio", 
      img: "https://images.pexels.com/photos/1034653/pexels-photo-1034653.jpeg?auto=compress&cs=tinysrgb&w=400" 
    },
  ];

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

    try {
      const res = await api.get("/user/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data?.stats || { total: 0, menunggu: 0, disetujui: 0 });
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50 text-blue-600 font-bold">
      Loading Dashboard...
    </div>
  );

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans text-slate-900">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-8 max-w-7xl mx-auto w-full space-y-10">
          
          {/* Header */}
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Selamat Datang Kembali! 👋</h2>
            <p className="text-slate-500 font-medium">Pantau dan ajukan peminjaman sarana prasarana dengan mudah.</p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Total Permohonan" value={stats.total} icon={ClipboardList} color="blue" />
            <StatCard label="Menunggu Review" value={stats.menunggu} icon={Clock} color="amber" />
            <StatCard label="Telah Disetujui" value={stats.disetujui} icon={CheckCircle} color="emerald" />
          </div>

          {/* Section Sarana Dan Prasarana (GRID SEPERTI GAMBAR) */}
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Sarana Dan Prasarana</h3>
              <Link to="/user/permohonan/baru" className="text-blue-600 font-bold text-sm hover:underline">Lihat Semua</Link>
            </div>

            {/* Scroll Container Horizontal */}
            <div className="flex gap-6 overflow-x-auto pb-6 -mx-2 px-2 scrollbar-hide">
              {daftarSarana.map((item, index) => (
                <div 
                  key={index} 
                  onClick={() => navigate("/user/permohonan/baru")}
                  className="min-w-[200px] bg-white rounded-3xl p-3 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                >
                  {/* Foto Sarana */}
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 mb-4">
                    <img 
                      src={item.img} 
                      alt={item.nama} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Label */}
                  <div className="px-2 pb-2 text-center">
                    <h4 className="font-bold text-slate-800 text-sm leading-tight group-hover:text-blue-600 transition-colors">
                      {item.nama}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">
                      {item.kategori}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shortcut Quick Action */}
          <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-200">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold">Butuh sarana untuk kegiatan Anda?</h3>
              <p className="text-blue-100 mt-1">Ajukan permohonan peminjaman sekarang secara digital.</p>
            </div>
            <Link to="/user/permohonan/baru" className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/20 active:scale-95">
              Mulai Ajukan Sekarang
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}

// Stat Card Sub-component
function StatCard({ label, value, icon: Icon, color }) {
  const colors = {
    blue: "bg-blue-600 shadow-blue-100",
    amber: "bg-amber-500 shadow-amber-100",
    emerald: "bg-emerald-500 shadow-emerald-100",
  };
  return (
    <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm flex justify-between items-center group hover:border-blue-200 transition-all">
      <div>
        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</p>
        <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{value}</h3>
      </div>
      <div className={`p-4 rounded-2xl text-white ${colors[color]} shadow-2xl transition-transform group-hover:rotate-12`}>
        <Icon size={28} />
      </div>
    </div>
  );
}