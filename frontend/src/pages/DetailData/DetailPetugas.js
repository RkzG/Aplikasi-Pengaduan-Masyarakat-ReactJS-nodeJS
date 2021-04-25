import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminDetails, updateAdminLevel } from "../../action/PetugasActions";
import Navbar from "../../component/Navbar/Index";
import { Link } from "react-router-dom";

export default function DetailPetugas({ match, history }) {
  const idPetugas = match.params.id;

  const [level, setLevel] = useState();
  const dispatch = useDispatch();

  const adminDetails = useSelector((state) => state.adminDetails);
  const { admins } = adminDetails;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  useEffect(() => {
    if (adminInfo) {
      dispatch(getAdminDetails(idPetugas));
    } else {
      history.push("/admin/login");
    }
  }, [adminInfo, history, dispatch, idPetugas]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateAdminLevel({
        id: idPetugas,
        level,
      })
    );
    history.push("/petugas/data");
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2> Data Masyarakat </h2>
        <ul class="list-group list-group-flush detailMasyarakat ">
          <Link to="/petugas/data" className="createAccount">
            Kembali
          </Link>
          <li class="list-group-item">
            ID : <b>{admins._id}</b>
          </li>

          <li class="list-group-item">
            NAME : <b>{admins.name}</b>
          </li>

          <li class="list-group-item">
            USERNAME : <b>{admins.username}</b>
          </li>
          <li class="list-group-item">
            TELEPHONE : <b>{admins.tlpn}</b>
          </li>
          <li class="list-group-item">
            LEVEL : <b>{admins.level}</b>
          </li>
          <form className="list-group-item" onSubmit={submitHandler}>
            <div className="row mt-1 ml-2">
              <input
                className="mt-2"
                type="radio"
                id="level"
                name="level"
                value="Petugas"
                onChange={(e) => setLevel(e.target.value)}
              ></input>
              <label className="ml-3">Jadikan Petugas</label>
            </div>
            <div className="row ml-2">
              <input
                className="mt-2 "
                type="radio"
                id="level"
                name="level"
                value="Admin"
                onChange={(e) => setLevel(e.target.value)}
              ></input>
              <label className="ml-3"> Jadikan Admin</label>
            </div>
            <div className="row">
              <button className="btn btn-primary ml-4">Kirim Status</button>
            </div>
          </form>
          <li class="list-group-item">
            TGL PEMBUATAN : <b>{admins.createdAt}</b>
          </li>
        </ul>
      </div>
    </div>
  );
}
