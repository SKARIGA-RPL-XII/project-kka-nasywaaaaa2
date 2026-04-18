import { Building2, LayoutDashboard, FileText, ClipboardList, User } from "lucide-react";

export default function DetailPermohonanAdmin() {

  const dataPermohonan = [
    {
      id: 1,
      tanggal: "2 April 2024",
      nama: "Ahmad",
      sarana: "Proyektor",
      status: "setuju",
    },
    {
      id: 2,
      tanggal: "21 Jan 2024",
      nama: "Budi Santoso",
      sarana: "Cair",
      status: "setuju",
    },
    {
      id: 3,
      tanggal: "21 Jan 2024",
      nama: "Siti Rahayu",
      sarana: "Ruang Sassin",
      status: "ditolak",
    },
    {
      id: 4,
      tanggal: "5 Jan 2024",
      nama: "Dian Prasetyo",
      sarana: "LCD",
      status: "ditolak",
    },
  ];

  const statusBadge = (status) => {
    if (status === "setuju")
      return "bg-green-100 text-green-700";
    if (status === "ditolak")
      return "bg-red-100 text-red-600";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-5">
        <div className="flex items-center gap-3 mb-10">
          <Building2 size={32} />
          <h1 className="font-semibold text-sm">
            Sistem Informasi Manajemen
          </h1>
        </div>

        <nav className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500 cursor-pointer">
            <LayoutDashboard size={18} />
            Dashboard
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500">
            <FileText size={18} />
            Daftar Permohonan
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500 cursor-pointer">
            <ClipboardList size={18} />
            Laporan & Rekap
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500 cursor-pointer">
            <User size={18} />
            Profil
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            Detail Permohonan
          </h2>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Logout
          </button>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow p-6">

          {/* Info Pemohon */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg">
              Nama Pemohon: Ahmad
            </h3>
            <p className="text-gray-500 text-sm">
              Budimai
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">No</th>
                  <th className="p-3 text-left">Tanggal</th>
                  <th className="p-3 text-left">Nama Pemohon</th>
                  <th className="p-3 text-left">Sarana/Prasarana</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {dataPermohonan.map((item, index) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{item.tanggal}</td>
                    <td className="p-3">{item.nama}</td>
                    <td className="p-3">{item.sarana}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(item.status)}`}>
                        {item.status === "setuju"
                          ? "Setujui"
                          : item.status === "ditolak"
                          ? "Ditolak"
                          : "Menunggu"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6 text-sm">
            <p>1-9 of 45 entries</p>

            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded bg-blue-600 text-white">
                1
              </button>
              <button className="px-3 py-1 border rounded">2</button>
              <button className="px-3 py-1 border rounded">3</button>
              <button className="px-3 py-1 border rounded">4</button>
              <button className="px-3 py-1 border rounded">5</button>
              <button className="px-3 py-1 border rounded">Next</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
