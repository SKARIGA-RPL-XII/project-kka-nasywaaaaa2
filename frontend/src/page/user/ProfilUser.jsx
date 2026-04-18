import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  User,
  LogOut,
  ClipboardList,
  Bell,
  Mail,
  ShieldCheck,
  Camera
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

// ================= NAVBAR (Konsisten) =================
function Navbar() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100 px-8 flex justify-between items-center">
      <div>
        <h1 className="text-sm font-medium text-gray-500 uppercase tracking-widest">Pengaturan</h1>
        <p className="text-xl font-bold text-gray-900">Profil Akun</p>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-gray-400 hover:text-blue-600 transition-colors">
          <Bell size={20} />
        </button>
        <div className="h-8 w-[1px] bg-gray-200"></div>
        <button
          onClick={handleLogout}
          className="group flex items-center gap-2 bg-slate-50 text-slate-600 px-5 py-2.5 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200 border border-slate-200 hover:border-red-100"
        >
          <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
          <span className="font-semibold text-sm">Keluar</span>
        </button>
      </div>
    </header>
  );
}

// ================= PROFIL USER =================
export default function ProfilUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ nama: "", email: "", role: "" });

  useEffect(() => {
    const nama = localStorage.getItem("nama");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    setUser({
      nama: nama || "User",
      email: email || "user@email.com",
      role: role || "user",
    });
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-8 max-w-4xl mx-auto w-full">
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
            {/* Header Profil (Banner) */}
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
            
            <div className="px-10 pb-10">
              {/* Avatar & Nama */}
              <div className="relative -mt-12 mb-8 flex items-end gap-6">
                <div className="relative group">
                  <div className="h-32 w-32 rounded-3xl bg-white p-1.5 shadow-xl">
                    <div className="h-full w-full rounded-[1.25rem] bg-slate-200 flex items-center justify-center text-slate-400">
                      <User size={60} />
                    </div>
                  </div>
                  <button className="absolute bottom-2 right-2 p-2 bg-white rounded-xl shadow-lg text-blue-600 hover:scale-110 transition-transform border border-slate-100">
                    <Camera size={18} />
                  </button>
                </div>
                
                <div className="pb-2">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">{user.nama}</h2>
                  <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-100 italic">
                    {user.role}
                  </span>
                </div>
              </div>

              {/* Info Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl text-blue-600 shadow-sm border border-slate-100">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Alamat Email</p>
                    <p className="text-slate-700 font-semibold">{user.email}</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl text-emerald-600 shadow-sm border border-slate-100">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status Akun</p>
                    <p className="text-emerald-600 font-bold uppercase text-sm">Terverifikasi</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex gap-4">
                <button className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98]">
                  Edit Profil
                </button>
                <button 
                  onClick={() => { localStorage.clear(); navigate("/"); }}
                  className="px-8 border-2 border-red-100 text-red-500 font-bold rounded-2xl hover:bg-red-50 transition-all flex items-center gap-2"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            </div>
          </div>
          
          <p className="text-center mt-8 text-slate-400 text-sm">
            ID User: <span className="font-mono text-slate-500">USR-7721092</span>
          </p>
        </div>
      </div>
    </div>
  );
}