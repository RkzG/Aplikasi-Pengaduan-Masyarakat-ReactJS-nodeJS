// App.js bisa dibilang sebagai pipa utama
// Fungsi yang sifatmnya global dan style yang sifatnya global
// Biasanya di taruh disini

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Import semua halaman yang mau dipake biar bisa dipanggil
import Login from "./pages/Login/Index";
import AdminLogin from "./pages/LoginAdmin/Index";
import Home from "./pages/Home/Index";
import HomeAdmin from "./pages/homeAdmin/Index";
import Register from "./pages/Register/Index";
import AdminRegister from "./pages/RegisterAdmin/Index";
import Pengaduan from "./pages/Pengaduan/Index";
import Laporan from "./pages/Laporan/Index";
import History from "./pages/History/Index";
import Ditanggapi from "./pages/Ditanggapi/Index";
import LaporanAdmin from "./pages/Laporan/IndexAdmin";
import Operator from "./pages/Operator/Index";
import User from "./pages/User/Index";
import Homescreen from "./pages/Homescreen/Index";
import Tanggapan from "./pages/Tanggapan/Index";
import Menanggapi from "./pages/Tanggapan/IndexMenanggapi";
import DataMasyarakat from "./pages/Data/IndexDataMasyarakat";
import DetailMasyarakat from "./pages/DetailData/IndexMasyarakat";
import DataPetugas from "./pages/Data/IndexDataPetugas";
import DetailPetugas from "./pages/DetailData/IndexPetugas";
import Pdf from "./pages/GeneratorPdf/Index";

export default function App() {
  return (
    <Router>
      <div className="HomeApp">
        {/* Untuk membuat branch nya atau jalur pipa nya */}
        <>
          <Route path="/login" component={Login} />
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin/register" component={AdminRegister} />
          <Route exact path="/" component={Homescreen} />
          <Route path="/statistik" component={Home} />
          <Route path="/admin/home" component={HomeAdmin} />
          <Route path="/register" component={Register} />
          <Route path="/pengaduan" component={Pengaduan} />
          <Route path="/:id/tanggapan" component={Ditanggapi} />
          <Route path="/laporan" component={Laporan} />
          <Route path="/laporanAdmin" component={LaporanAdmin} />
          <Route path="/history" component={History} />
          <Route path="/operator" component={Operator} />
          <Route path="/user" component={User} />
          <Route path="/admin/menanggapi" component={Tanggapan} />
          <Route path="/admin/tanggapi/:id" component={Menanggapi} />
          <Route path="/masyarakat/data" component={DataMasyarakat} />
          <Route path="/masyarakat/details/:id" component={DetailMasyarakat} />
          <Route path="/petugas/data" component={DataPetugas} />
          <Route path="/petugas/details/:id" component={DetailPetugas} />
          <Route path="/petugas/pdf" component={Pdf} />
        </>
      </div>
    </Router>
  );
}
