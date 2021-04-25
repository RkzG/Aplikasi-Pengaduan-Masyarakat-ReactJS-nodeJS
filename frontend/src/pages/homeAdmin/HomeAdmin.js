import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Navbar from "../../component/Navbar/Index";
import { useSelector } from "react-redux";

export default function Home() {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const history = useHistory();
  useEffect(() => {
    if (!adminInfo) {
      history.push("/admin/login");
    }
  }, [history, adminInfo]);
  return (
    <div className="bgHome">
      <Navbar />
      <div className="container statistik">
        <h2 className="shadow-lg p-5">
          Welcome to MyReport.co {/* {adminInfo.name} */}
        </h2>
      </div>
    </div>
  );
}

{
  /* 
      <span onClick={() => history.push("/Login")}>Login</span>
      <Link to={"/login"}>Tes</Link> */
}
