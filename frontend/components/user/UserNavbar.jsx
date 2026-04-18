import { LogOut, UserCircle } from "lucide-react";

export default function UserNavbar() {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">

      <h1 className="text-lg font-semibold text-gray-700">
        Dashboard User
      </h1>

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-2 text-gray-600">
          <UserCircle size={20} />
          <span>User</span>
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </div>
  );
}
