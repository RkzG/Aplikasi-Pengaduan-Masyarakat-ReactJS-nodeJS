import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  listTanggapan,
  deleteTanggapanAdmin,
} from "../../action/TanggapanActions";
import ReactToPdf from "react-to-pdf";
import Navbar from "../../component/Navbar/Index";

export default function Pdf(history) {
  const dispatch = useDispatch();
  const ref = React.createRef();
  const options = {
    orientation: "landscape",
  };

  const tanggapanList = useSelector((state) => state.tanggapanList);
  const { tanggapans } = tanggapanList;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  useEffect(() => {
    if (adminInfo) {
      dispatch(listTanggapan());
    } else {
      history.push("/admin/login");
    }
  }, [dispatch, history, adminInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteTanggapanAdmin(id));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container tabelLaporan">
        <h2 className="text-light">Data Tanggapan</h2>
        <Link to="/petugas/pdf" className="createAccount">
          Kembali
        </Link>
        <ReactToPdf
          targetRef={ref}
          filename="tanggapan.pdf"
          options={options}
          x={0.5}
          y={0.5}
          scale={0.8}
        >
          {({ toPdf }) => (
            <button className="btn btn-success ml-5" onClick={toPdf}>
              Generate PDF
            </button>
          )}
        </ReactToPdf>

        <div
          ref={ref}
          className="row card shadow-lg table-light text-dark px-5 py-3 mt-3"
        >
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">PENGADUAN</th>
                <th scope="col">TANGGAPAN</th>
                <th scope="col">USERID</th>
                <th scope="col">BUKTI</th>
                <th scope="col">STATUS</th>
                <th scope="col">PETUGAS</th>
                <th scope="col">TGL</th>
              </tr>
            </thead>
            <tbody>
              {tanggapans &&
                tanggapans.map((tanggapan) => (
                  <tr key={tanggapan._id}>
                    <td>{tanggapan._id}</td>
                    <td>
                      {tanggapan.pengaduan && tanggapan.pengaduan.isi_laporan}
                    </td>
                    <td>{tanggapan.tanggapan}</td>
                    <td>
                      <Link
                        to={`/masyarakat/details/${
                          tanggapan.pengaduan && tanggapan.pengaduan.masyarakat
                        }`}
                      >
                        <button className="btn btn-info">Details</button>
                      </Link>
                    </td>
                    <td>
                      <img
                        src={tanggapan.pengaduan && tanggapan.pengaduan.image}
                        className="image"
                        width="50"
                        height="50"
                        alt="can't open"
                      ></img>
                    </td>
                    <td>{tanggapan.pengaduan && tanggapan.pengaduan.status}</td>
                    <td>{tanggapan.petugas && tanggapan.petugas.name}</td>
                    <td>{tanggapan.createdAt}</td>

                    {/* {tanggapan.pengaduan === null ? (
                      <button
                        className="btn btn-danger"
                        onClick={deleteHandler(tanggapan._id)}
                      >
                        Delete
                      </button>
                    ) : (
                      <button className="btn btn-danger">Delete</button>
                    )} */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
