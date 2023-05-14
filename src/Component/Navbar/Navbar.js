import React, { Fragment, useContext } from "react";
import AuthContext from "../../Store/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Navbar.css";
import AuthForm from "../Pages/AuthForm";

export default function Navbar() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
    navigate("/");
  };
  return (
    <Fragment>
       
      <div className="navbar">
      {!authCtx.isLoggedIn && (
        <Link to="/login">Login</Link>
      )}
      {authCtx.isLoggedIn &&  <button onClick={logoutHandler}>Logout</button>}
      </div>
    </Fragment>
  );
}
