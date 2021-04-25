import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <ul>
          <li>
            <Link className="sidebar-li" to="/Statistik">
              Beranda
            </Link>
          </li>
          <li>
            <Link className="sidebar-li" to="/Pengaduan">
              Pengaduan
            </Link>
          </li>
          <li>
            <Link className="sidebar-li" to="/Laporan">
              Laporan
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
