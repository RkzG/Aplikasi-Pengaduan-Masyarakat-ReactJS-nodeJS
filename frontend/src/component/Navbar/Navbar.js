import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../action/MasyarakatActions";
import { logoutAdmin } from "../../action/PetugasActions";

export default function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  const logoutAdminHandler = () => {
    dispatch(logoutAdmin());
    history.push("/");
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <h1>MyReport.co</h1>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          {userInfo ? (
            <>
              <li class="nav-item">
                <NavLink className="nav-link complaint" to="/Statistik">
                  Home
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link complaint" to="/Pengaduan">
                  Complaint
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link report" to="/Laporan">
                  Report
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link signOut" to="/">
                  <button className="btn btn-danger" onClick={logoutHandler}>
                    Sign-out
                  </button>
                </NavLink>
              </li>
            </>
          ) : (
            ""
          )}
          {adminInfo ? (
            <>
              <li class="nav-item">
                <NavLink className="nav-link complaint" to="/admin/home">
                  Home
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link report" to="/admin/menanggapi">
                  Response
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link report" to="/masyarakat/data">
                  User Data
                </NavLink>
              </li>
              {adminInfo.level === "Admin" ? (
                <>
                  <li class="nav-item">
                    <NavLink className="nav-link report" to="/petugas/data">
                      Operator Data
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink className="nav-link report" to="/petugas/pdf">
                      Generate
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}
              <li class="nav-item">
                <NavLink className="nav-link signOut2" to="/">
                  <button
                    className="btn btn-danger"
                    onClick={logoutAdminHandler}
                  >
                    Sign-out
                  </button>
                </NavLink>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
      </div>
    </nav>
    /* <div className="sidebar">
      <div className="sidebar-brand">
        <h1>
          <span className="report.co">Report.co</span>
        </h1>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li>
            <Link className="sidebar-li" to="/Statistik">
              Beranda
            </Link>
          </li>
          <li>
            <Link className="sidebar-li" to="/login">
              Pengaduan
            </Link>
          </li>
          <li>
            <Link className="sidebar-li" to="/Register">
              Laporan
            </Link>
          </li>
          <li>
            <Link className="sidebar-li" to="/">
              Akun
            </Link>
          </li>
        </ul>
      </div>
    </div> */
  );
}

{
  /* <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <h1>MyReport.co</h1>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <NavLink className="nav-link home" to="/Statistik">
              Home
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink className="nav-link complaint" to="/Pengaduan">
              Complaint
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink className="nav-link report" to="/Laporan">
              Report
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink className="nav-link signOut" to="/Login">
              <button className="btn btn-danger">Sign-out</button>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav> */
}
