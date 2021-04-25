import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMasyarakatDetailsAdmin } from "../../action/MasyarakatActions";
import Navbar from "../../component/Navbar/Index";
import { Link } from "react-router-dom";

export default function DetailMasyarakat({ match, history }) {
  const idMasya = match.params.id;
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { users } = userDetails;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  useEffect(() => {
    if (adminInfo) {
      dispatch(getMasyarakatDetailsAdmin(idMasya));
    } else {
      history.push("/admin/login");
    }
  }, [adminInfo, history, idMasya, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2> Data Masyarakat </h2>
        <ul class="list-group list-group-flush detailMasyarakat ">
          <Link to="/masyarakat/data" className="createAccount">
            Kembali
          </Link>
          <li class="list-group-item">
            ID : <b>{users._id}</b>
          </li>
          <li class="list-group-item">
            NIK : <b>{users.nik}</b>
          </li>

          <li class="list-group-item">
            NAME : <b>{users.name}</b>
          </li>

          <li class="list-group-item">
            USERNAME : <b>{users.username}</b>
          </li>
          <li class="list-group-item">
            TELEPHONE : <b>{users.tlpn}</b>
          </li>
          <li class="list-group-item">
            TGL PEMBUATAN : <b>{users.createdAt}</b>
          </li>
        </ul>
      </div>
    </div>
  );
}
