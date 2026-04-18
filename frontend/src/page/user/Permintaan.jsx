  import { useState } from "react";
  import { useLocation, Link, useNavigate } from "react-router-dom"; 
  import api from "../../services/api"; 
  import {
    LayoutDashboard,
    FileText,
    User,
    LogOut,
    ClipboardList,
    Bell,
    Send,
    Info,
    UserCircle,
  } from "lucide-react";

  // ================= SIDEBAR COMPONENT =================
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

  // ================= NAVBAR COMPONENT =================
  function Navbar() {
    const handleLogout = () => {
      localStorage.clear();
      window.location.href = "/";
    };
    return (
      <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100 px-8 flex justify-between items-center">
        <div>
          <h1 className="text-sm font-medium text-gray-500 uppercase tracking-widest">Layanan</h1>
          <p className="text-xl font-bold text-gray-900">Form Permohonan</p>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-blue-600 transition-colors"><Bell size={20} /></button>
          <div className="h-8 w-[1px] bg-gray-200"></div>
          <button onClick={handleLogout} className="group flex items-center gap-2 bg-slate-50 text-slate-600 px-5 py-2.5 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all border border-slate-200">
            <LogOut size={18} />
            <span className="font-semibold text-sm">Keluar</span>
          </button>
        </div>
      </header>
    );
  }

  // ================= MAIN COMPONENT =================
  export default function Permohonan() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const [form, setForm] = useState({
      nama: "", 
      sarana: "Proyektor HD", 
      tanggal: "",
      waktu: "",
      deskripsi: "",
    });

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const token = localStorage.getItem("token");
        
        // PERBAIKAN: Mengirim ke /user/dashboard karena rute POST didaftarkan di sana pada backend
        const res = await api.post("/user/dashboard", form, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.status === 201 || res.status === 200) {
          alert("Permohonan Berhasil Dikirim!");
          navigate("/user/permohonan"); 
        }
      } catch (err) {
        console.error("Error Detail:", err.response);
        const errorMsg = err.response?.data?.msg || "Terjadi kesalahan saat mengirim data.";
        
        alert(err.response?.status === 404 
          ? "Gagal: Endpoint API tidak ditemukan (404). Pastikan router.post('/dashboard', ...) sudah ada di Backend." 
          : `Gagal: ${errorMsg}`);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="p-8 max-w-5xl mx-auto w-full">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Buat Permohonan</h2>
              <p className="text-slate-500 mt-2">Lengkapi detail peminjaman sarana dan prasarana di bawah ini.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 ml-1 uppercase tracking-wide">Nama Pemohon</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                          <UserCircle size={20} />
                        </div>
                        <input type="text" name="nama" value={form.nama} onChange={handleChange} placeholder="Masukkan nama lengkap" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 ml-1 uppercase tracking-wide">Jenis Sarana</label>
                      <select name="sarana" value={form.sarana} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all cursor-pointer font-medium appearance-none">
                        <option value="Proyektor HD">Proyektor HD</option>
                        <option value="Monitor LCD">Monitor LCD</option>
                        <option value="Ruang Rapat">Ruang Rapat</option>
                        <option value="Sound System">Sound System</option>
                        <option value="Kabel HDMI/VGA">Kabel HDMI/VGA</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 ml-1 uppercase tracking-wide">Tanggal</label>
                        <input type="date" name="tanggal" value={form.tanggal} onChange={handleChange} required className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 ml-1 uppercase tracking-wide">Waktu</label>
                        <input type="time" name="waktu" value={form.waktu} onChange={handleChange} required className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 ml-1 uppercase tracking-wide">Deskripsi Keperluan</label>
                      <textarea name="deskripsi" rows="4" value={form.deskripsi} onChange={handleChange} placeholder="Contoh: Untuk keperluan presentasi rapat tahunan..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium resize-none" required></textarea>
                    </div>

                    <button type="submit" disabled={loading} className={`w-full ${loading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2`}>
                      <Send size={20} />
                      {loading ? "Sedang Mengirim..." : "Kirim Permohonan"}
                    </button>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 sticky top-28">
                  <div className="flex items-center gap-3 text-blue-600 mb-4 font-bold">
                    <Info size={24} />
                    <h3>Panduan</h3>
                  </div>
                  <ul className="space-y-4 text-sm text-blue-800 leading-relaxed">
                    <li>• Pastikan data diri sudah sesuai.</li>
                    <li>• Ajukan maksimal 2 hari sebelum pemakaian.</li>
                    <li>• Hubungi admin jika butuh persetujuan mendesak.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }