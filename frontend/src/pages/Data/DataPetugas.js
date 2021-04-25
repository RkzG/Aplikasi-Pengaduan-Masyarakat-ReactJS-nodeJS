import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactToPdf from "react-to-pdf";
import { listAdmin, deleteAdmin } from "../../action/PetugasActions";
import Navbar from "../../component/Navbar/Index";

export default function DataPetugas({ history }) {
  const dispatch = useDispatch();
  const ref = React.createRef();
  const options = {
    orientation: "landscape",
  };

  const adminList = useSelector((state) => state.adminList);
  const { admins } = adminList;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const adminDelete = useSelector((state) => state.adminDelete);
  const { success: successDelete } = adminDelete;

  useEffect(() => {
    if (adminInfo) {
      dispatch(listAdmin());
    } else {
      history.push("/admin/login");
    }
  }, [dispatch, history, adminInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteAdmin(id));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container tabelLaporan">
        <h2 className="text-light">Data Petugas</h2>
        <Link to="/admin/home" className="createAccount">
          Kembali
        </Link>
        <ReactToPdf
          targetRef={ref}
          filename="Petugas.pdf"
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
                <th scope="col">Name</th>
                <th scope="col">User</th>
                <th scope="col">Telephone</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {admins &&
                admins.map((admin) => (
                  <tr key={admin._id}>
                    <td>{admin._id}</td>
                    <td>{admin.name}</td>
                    <td>{admin.username}</td>
                    <td>{admin.tlpn}</td>
                    <td>
                      <Link to={`/petugas/details/${admin._id}`}>
                        <button className="btn btn-info">Details</button>
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteHandler(admin._id)}
                      >
                        Delete
                      </button>
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
