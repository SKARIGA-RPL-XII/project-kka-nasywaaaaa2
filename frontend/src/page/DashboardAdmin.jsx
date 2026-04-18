import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import TablePermohonan from "../../components/TablePermohonan";
import { Building2, ClipboardList, ShieldCheck } from "lucide-react";

export default function DashboardAdmin() {
  const [stats, setStats] = useState({});
  const [permohonan, setPermohonan] = useState([]);

  useEffect(() => {
    api.get("/dashboard").then((res) => {
      setStats(res.data.stats);
      setPermohonan(res.data.latest);
    });
  }, []);

  return (
    <div className="flex bg-[#f3f5fb] min-h-screen">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          
          {/* TITLE */}
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Dashboard
          </h2>

          {/* === STAT CARDS === */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            {/* TOTAL */}
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-5 shadow-md">
              <div>
                <p className="text-sm opacity-90">Total Permohonan</p>
                <h3 className="text-3xl font-bold mt-1">
                  {stats.total || 0}
                </h3>
              </div>

              <div className="bg-white/20 p-3 rounded-lg">
                <Building2 size={28} />
              </div>
            </div>

            {/* MENUNGGU */}
            <div className="flex items-center justify-between bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl p-5 shadow-md">
              <div>
                <p className="text-sm opacity-90">Permohonan Menunggu</p>
                <h3 className="text-3xl font-bold mt-1">
                  {stats.menunggu || 0}
                </h3>
              </div>

              <div className="bg-white/20 p-3 rounded-lg">
                <ClipboardList size={28} />
              </div>
            </div>

            {/* DISETUJUI */}
            <div className="flex items-center justify-between bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-5 shadow-md">
              <div>
                <p className="text-sm opacity-90">Disetujui</p>
                <h3 className="text-3xl font-bold mt-1">
                  {stats.disetujui || 0}
                </h3>
              </div>

              <div className="bg-white/20 p-3 rounded-lg">
                <ShieldCheck size={28} />
              </div>
            </div>
          </div>

          {/* === TABLE CARD === */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Permohonan Terbaru
            </h3>

            <TablePermohonan data={permohonan} />
          </div>

        </div>
      </div>
    </div>
  );
}
