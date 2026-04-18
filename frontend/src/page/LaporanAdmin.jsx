import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function LaporanAdmin() {
  return (
    <div className="flex bg-[#f4f6fb] min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Laporan & Rekap
          </h2>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">
              Data laporan permohonan akan tampil di sini.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
