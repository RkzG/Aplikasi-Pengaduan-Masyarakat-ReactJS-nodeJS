import React from "react";
import { Link } from "react-router-dom";

export default function Homescreen() {
  return (
    <body className="homescreen">
      <div className="container ">
        <div className="content">
          <h1>Hello...</h1>
          <div className="userLogin">
            <h2>Login As User</h2>
            <button className="btn btn-info">
              <Link className="text-light" to="/login">
                Login
              </Link>
            </button>
          </div>
          <div className="adminLogin">
            <h2>Login As Admin/Operator</h2>
            <button className="btn btn-info">
              <Link className="text-light" to="/admin/login">
                Login
              </Link>
            </button>
          </div>
        </div>
      </div>
    </body>
  );
}
