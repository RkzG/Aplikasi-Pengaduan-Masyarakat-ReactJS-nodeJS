import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../../action/MasyarakatActions";
import Navbar from "../../component/Navbar/Index";

import ReactToPdf from "react-to-pdf";
const ref = React.createRef();
const options = {
  orientation: "landscape",
};

export default function DataMasyarakat({ history }) {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (adminInfo) {
      dispatch(listUsers());
    } else {
      history.push("/admin/login");
    }
  }, [dispatch, history, adminInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteUser(id));
    }
    if (successDelete) {
      history.push("/masyarakat/data");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container tabelLaporan">
        <h2 className="text-light">Data Masyarakat</h2>
        <Link to="/admin/home" className="createAccount">
          Kembali
        </Link>
        {adminInfo.level === "Admin" ? (
          <ReactToPdf
            targetRef={ref}
            filename="Masyarakat.pdf"
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
        ) : (
          ""
        )}
        <div
          ref={ref}
          className="row card shadow-lg table-light text-dark px-5 py-3 mt-3"
        >
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">NIK</th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">User</th>
                <th scope="col">Telephone</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.nik}</td>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.tlpn}</td>
                    <td>
                      <Link to={`/masyarakat/details/${user._id}`}>
                        <button className="btn btn-info">Details</button>
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteHandler(user._id)}
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
