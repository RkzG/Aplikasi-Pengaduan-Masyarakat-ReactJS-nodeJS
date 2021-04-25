import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  listUserTanggapan,
  deleteTanggapan,
} from "../../action/TanggapanActions";

export default function Ditanggapi({ match, history }) {
  const pengaduanId = match.params.id;
  const dispatch = useDispatch();

  const tanggapanUserList = useSelector((state) => state.tanggapanUserList);
  const { tanggapans } = tanggapanUserList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listUserTanggapan(pengaduanId));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, pengaduanId]);

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure?")) {
      dispatch(deleteTanggapan(id));
      history.push("/Laporan");
    }
  };

  return (
    <div className="">
      <div className="container tabelLaporan">
        <button className="btn btnBack btn-danger">
          <Link className="back text-light" to="/Laporan">
            Back
          </Link>
        </button>
        <h2 className="text-light">Data Tanggapan</h2>
        <div className="row card shadow-lg table-light text-dark px-5 py-3">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th scope="col">Response</th>
                <th scope="col">Operator</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {tanggapans &&
                tanggapans.map((tanggap) => (
                  <tr key={tanggap._id}>
                    <td>{tanggap._id}</td>
                    <td>
                      {tanggap.pengaduan && tanggap.pengaduan.isi_laporan}
                    </td>
                    <td>{tanggap.pengaduan && tanggap.pengaduan.status}</td>
                    <td>{tanggap.tanggapan}</td>
                    <td>{tanggap.petugas && tanggap.petugas.name}</td>
                    <td>
                      {tanggap.pengaduan.status == "Selesai" ? (
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteHandler(tanggap._id)}
                        >
                          Delete
                        </button>
                      ) : (
                        <td>Dapat dihapus ketika selesai</td>
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
