import {
  LayoutDashboard,
  FilePlus,
  ClipboardList,
  User
} from "lucide-react";

export default function UserSidebar() {
  return (
    <div className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6 min-h-screen">

      <h2 className="text-lg font-bold mb-10">
        USER PANEL
      </h2>

      <ul className="space-y-4">

        <li className="flex items-center gap-3 p-3 rounded-lg bg-blue-500 cursor-pointer">
          <LayoutDashboard size={18} />
          Dashboard
        </li>

        <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500 transition cursor-pointer">
          <FilePlus size={18} />
          Ajukan Permohonan
        </li>

        <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500 transition cursor-pointer">
          <ClipboardList size={18} />
          Riwayat Permohonan
        </li>

        <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500 transition cursor-pointer">
          <User size={18} />
          Profil
        </li>

      </ul>
    </div>
  );
}
