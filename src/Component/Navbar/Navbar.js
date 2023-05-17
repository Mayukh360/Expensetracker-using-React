import React, { Fragment, useContext } from "react";
import AuthContext from "../../Store/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authActions } from "../../storee/AuthReducer";

import AuthForm from "../Pages/AuthForm";

export default function Navbar() {
  const dispatch=useDispatch();
  const isLoggedIn=useSelector(state=>state.auth.isAuthenticated)
 
 
  const navigate = useNavigate();
  // const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    dispatch(authActions.islogout());

    // authCtx.logout();
    navigate("/");
  };
  return (
    <Fragment>
      <nav className="flex items-center justify-between bg-gray-900 p-4">
        <Link to="/expensetracker" className="text-white text-xl font-semibold">
          Expense Tracker
        </Link>
        <div>
          {!isLoggedIn && (
            <Link
              to="/"
              className="text-white font-medium mr-4 hover:underline"
            >
              Login
            </Link>
          )}
          {isLoggedIn && (
            <button
              onClick={logoutHandler}
              className="text-white font-medium hover:underline"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </Fragment>
  );
}
