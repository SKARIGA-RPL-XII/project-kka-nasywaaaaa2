export default function TablePermohonan({ data }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">No</th>
          <th className="p-2">Tanggal</th>
          <th className="p-2">Nama Pemohon</th>
          <th className="p-2">Sarana/Prasarana</th>
          <th className="p-2">Jumlah</th>
          <th className="p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={item.id} className="text-center border-b">
            <td className="p-2">{i + 1}</td>
            <td className="p-2">{item.tanggal}</td>
            <td className="p-2">{item.nama}</td>
            <td className="p-2">{item.sarana}</td>
            <td className="p-2">{item.jumlah}</td>
            <td className="p-2">
              <span
                className={`px-3 py-1 rounded text-white text-sm
                ${item.status === "Disetujui" && "bg-green-500"}
                ${item.status === "Menunggu" && "bg-yellow-500"}
                ${item.status === "Ditolak" && "bg-red-500"}`}
              >
                {item.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
