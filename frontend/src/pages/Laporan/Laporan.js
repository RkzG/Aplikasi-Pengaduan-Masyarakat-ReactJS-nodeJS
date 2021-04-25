import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar/Index";
import Sidebar from "../../component/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  listUserPengaduan,
  deletePengaduan,
} from "../../action/PegaduanActions";

export default function Laporan() {
  const history = useHistory();
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
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deletePengaduan(id));
    }
  };
  return (
    <div className="">
      <Navbar />
      <div className="container tabelLaporan">
        <h2 className="text-light">Report Table</h2>
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
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {pengaduans &&
                pengaduans.map((pengadu) => (
                  <tr key={pengadu._id}>
                    <td>{pengadu._id}</td>
                    <td>
                      {" "}
                      <img
                        src={pengadu.image}
                        alt=""
                        width="50"
                        height="50"
                        fluid
                      />
                    </td>
                    <td>{pengadu.createdAt}</td>
                    {pengadu.status === "proses" ? (
                      <td style={{ color: "Orange" }}>{pengadu.status}</td>
                    ) : (
                      <>
                        {pengadu.status === "selesai" ? (
                          <td style={{ color: "Green" }}>{pengadu.status}</td>
                        ) : (
                          <td>{pengadu.status}</td>
                        )}
                      </>
                    )}

                    <td>{pengadu.isi_laporan}</td>
                    <td>{pengadu.lokasi}</td>
                    <td>
                      <Link to={`/${pengadu._id}/tanggapan`}>
                        <button className="btn btn-info">
                          Lihat Tanggapan
                        </button>
                      </Link>
                      {pengadu.status === "Selesai" ||
                      pengadu.status === "Terkirim" ? (
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteHandler(pengadu._id)}
                        >
                          Delete
                        </button>
                      ) : (
                        <p>Dapat dihapus ketika selesai</p>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
