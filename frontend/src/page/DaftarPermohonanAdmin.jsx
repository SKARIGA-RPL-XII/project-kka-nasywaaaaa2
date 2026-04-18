import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function DaftarPermohonanAdmin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/permohonan").then((res) => {
      setData(res.data);
    });
  }, []);

  const statusColor = (status) => {
    if (status === "Disetujui")
      return "bg-green-100 text-green-600";
    if (status === "Menunggu")
      return "bg-yellow-100 text-yellow-600";
    if (status === "Ditolak")
      return "bg-red-100 text-red-600";

    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="flex bg-[#f4f6fb] min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1">
        <Navbar />

        <div className="p-6">

          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Daftar Permohonan
          </h2>

          {/* Card */}
          <div className="bg-white rounded-xl shadow p-6">

            {/* FILTER */}
            <div className="flex flex-wrap gap-4 mb-6">
              <input
                type="date"
                className="border rounded-lg px-4 py-2 text-sm"
              />
              <input
                type="date"
                className="border rounded-lg px-4 py-2 text-sm"
              />

              <select className="border rounded-lg px-4 py-2 text-sm">
                <option>Semua Status</option>
                <option>Disetujui</option>
                <option>Menunggu</option>
                <option>Ditolak</option>
              </select>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-600">
                    <th className="text-left p-3">No</th>
                    <th className="text-left p-3">Tanggal</th>
                    <th className="text-left p-3">Nama Pemohon</th>
                    <th className="text-left p-3">Sarana / Prasarana</th>
                    <th className="text-left p-3">Jumlah</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((item, index) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{item.tanggal}</td>
                      <td className="p-3">{item.nama}</td>
                      <td className="p-3">{item.sarana}</td>
                      <td className="p-3">{item.jumlah}</td>

                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                            item.status
                          )}`}
                        >
                          ● {item.status}
                        </span>
                      </td>

                      <td className="p-3">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg text-sm">
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
              <span>1-5 of 45 entries</span>

              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded">1</button>
                <button className="px-3 py-1 border rounded">2</button>
                <button className="px-3 py-1 border rounded">3</button>
                <button className="px-3 py-1 border rounded">Next</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
