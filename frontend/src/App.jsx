import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./page/login";

function App() {
  return (
    <Routes>
      {/* Halaman default */}
      <Route path="/" element={<Login />} />

      {/* Redirect kalau route tidak ditemukan */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
