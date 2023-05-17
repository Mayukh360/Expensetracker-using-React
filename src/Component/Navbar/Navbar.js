import React, { Fragment, useContext } from "react";
import AuthContext from "../../Store/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authActions } from "../../storee/AuthReducer";

import AuthForm from "../Pages/AuthForm";

export default function Navbar() {
  const dispatch = useDispatch();
  const isPremium = useSelector((state) => state.auth.isPremium);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  const navigate = useNavigate();
  // const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    dispatch(authActions.islogout());

    // authCtx.logout();
    navigate("/");
  };
  return (
    <Fragment>
      <nav className="flex items-center justify-between bg-gray-900 p-4 border border-gray-300">
        <Link to="/expensetracker" className="text-white text-xl font-semibold">
          Expense Tracker
        </Link>
        <div>
        {!isLoggedIn && (
            <Link
              to="/"
              className="text-white font-medium mr-4 hover:underline"
            >
              <button className="text-white font-medium hover:underline px-4 py-2 rounded-md bg-gray-800">
                Login
              </button>
            </Link>
          )}
          {isPremium && (
            <button className="text-white font-medium bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-r hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 px-4 py-2 rounded-md mr-4">
              <span className="inline-block text-gray-900">Avail Premium</span>
            </button>
          )}

          {isLoggedIn && (
            <button
              onClick={logoutHandler}
              className="text-white font-medium hover:underline px-4 py-2 rounded-md bg-red-800"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
      {/* {isPremium && <button>Avail Premium</button>} */}
    </Fragment>
  );
}
