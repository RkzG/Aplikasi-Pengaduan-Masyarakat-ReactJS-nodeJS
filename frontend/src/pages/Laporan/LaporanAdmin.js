import React, { useState } from "react";
import Navbar from "../../component/Navbar/Index";
import Table from "../../component/Table";

export default function Laporan() {
  const dataLaporan = [{ no: 1, Description: "Kebakaran Hutan", Image: "" }];
  return (
    <div className="">
      <Navbar />
      <div className="container tabelLaporan">
        <h2>Report Table</h2>
        <div className="row card shadow-lg table-light text-dark px-5 py-3">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Username</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>
                  <div className="col">
                    <button className="btn btn-success">Accept</button>
                  </div>
                  <br />
                  <div className="col">
                    <button className="btn btn-danger">Decline</button>
                  </div>
                </td>
                <td>
                  <div className="col">
                    <button className="btn btn-info">Open</button>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>
                  <div className="col">
                    <button className="btn btn-success">Accept</button>
                  </div>
                  <br />
                  <div className="col">
                    <button className="btn btn-danger">Decline</button>
                  </div>
                </td>
                <td>
                  <div className="col">
                    <button className="btn btn-info">Open</button>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>
                  <div className="col">
                    <button className="btn btn-success">Accept</button>
                  </div>
                  <br />
                  <div className="col">
                    <button className="btn btn-danger">Decline</button>
                  </div>
                </td>
                <td>
                  <div className="col">
                    <button className="btn btn-info">Open</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
