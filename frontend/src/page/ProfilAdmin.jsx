import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useState } from "react";

export default function ProfilAdmin() {
  const [form, setForm] = useState({
    nama: "Admin",
    username: "admin",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="flex bg-[#f4f6fb] min-h-screen">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1">
        <Navbar />

        <div className="p-10">
          
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-700 mb-8">
            Profil Admin
          </h2>

          {/* Card BESAR */}
          <div className="bg-white rounded-2xl shadow-lg p-10 max-w-6xl">

            {/* Header Profile */}
            <div className="flex items-center gap-6 mb-8">
              
              {/* Avatar BESAR */}
              <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                A
              </div>

              <div>
                <h3 className="text-2xl font-bold">Admin</h3>
                <p className="text-gray-500 text-base">Administrator Sistem</p>
              </div>

            </div>

            <hr className="mb-8" />

            {/* Form */}
            <form onSubmit={handleSubmit}>
              
              <div className="grid md:grid-cols-2 gap-8">

                {/* Nama */}
                <div>
                  <label className="text-base font-semibold text-gray-600">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    className="w-full mt-2 border rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="text-base font-semibold text-gray-600">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full mt-2 border rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="text-base font-semibold text-gray-600">
                    Ganti Password (Optional)
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="********"
                    className="w-full mt-2 border rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-base font-semibold text-gray-600">
                    Konfirmasi Password (Optional)
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="********"
                    className="w-full mt-2 border rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-12">
                
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl font-semibold text-lg"
                >
                  Simpan Perubahan
                </button>

                <button
                  type="button"
                  className="bg-red-100 text-red-600 px-10 py-3 rounded-xl font-semibold text-lg hover:bg-red-200"
                >
                  Hapus Akun
                </button>

              </div>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
}
