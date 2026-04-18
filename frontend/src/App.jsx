import { Routes, Route, Navigate } from "react-router-dom";

// AUTH PAGE
import Login from "./page/login"; 
import Register from "./page/register";

// ADMIN PAGE
import DashboardAdmin from "./page/DashboardAdmin";
import Daftar from "./page/DaftarPermohonanAdmin";
import Detailpermohonan from "./page/DetailPermohonanAdmin";
import Laporan from "./page/LaporanAdmin";
import ProfileAdmin from "./page/ProfilAdmin";

// USER PAGE
import Dashboard from "./page/user/DashboardUser";
import Permintaan from "./page/user/Permintaan";
import ProfileUser from "./page/user/ProfilUser";
import Status from "./page/user/StatusPermohonanUser";

function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* USER ROUTES */}
      <Route path="/user/dashboard" element={<Dashboard />} />
      <Route path="/user/profil" element={<ProfileUser />} />
      <Route path="/user/permohonan" element={<Status />} />
      <Route path="/user/permohonan/baru" element={<Permintaan />} />

      {/* ADMIN ROUTES */}
      <Route path="/admin/dashboard" element={<DashboardAdmin />} />
      <Route path="/admin/profil" element={<ProfileAdmin />} />
      <Route path="/admin/permohonan" element={<Daftar />} />
      <Route path="/admin/DetailPermohonanAdmin" element={<Detailpermohonan />} />
      <Route path="/admin/laporan" element={<Laporan />} />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;