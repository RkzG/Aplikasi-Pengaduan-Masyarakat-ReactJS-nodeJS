import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar/Index";
import moment from "moment";
import Table from "../../component/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  listUserPengaduan,
  deletePengaduan,
} from "../../action/PegaduanActions";

export default function History(history) {
  const dispatch = useDispatch();

  const pengaduanUserList = useSelector((state) => state.pengaduanUserList);
  const { loading, error, pengaduans } = pengaduanUserList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const pengaduanDelete = useSelector((state) => state.pengaduanDelete);
  const { success: successDelete } = pengaduanDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(listUserPengaduan());
    } else {
      history.push("/masyarakat/login");
    }
  }, [dispatch, history, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deletePengaduan(id));
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container tabelLaporan">
        <h2>History Table</h2>
        <div className="row card shadow-lg table-light text-dark px-5 py-3">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Image</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">Description</th>
                <th scope="col">Location</th>
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
