import React, { Fragment, useEffect } from "react";
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./AuthForm.module.css";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../storee/AuthReducer";

export default function AuthForm() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    // const changedemail = enteredEmail.replace("@", "").replace(".", "");

    localStorage.setItem("email", enteredEmail);
    const enteredPassword = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;
    console.log(enteredEmail, enteredPassword, confirmPassword);

    if (enteredPassword === confirmPassword) {
      setIsLoading(true);
      let url;
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCIcUCMaO5hHVJlbK7pso9z86iimfWHmpM";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCIcUCMaO5hHVJlbK7pso9z86iimfWHmpM";
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          setIsLoading(false);
          if (response.ok) {
            console.log("User Successfully Login", response);
            return response.json();
          } else {
            //The responde holds error
            return response.json().then((data) => {
              let errorMessage =
                "Authentication Failed,please Check input field";

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          dispatch(authActions.islogin(data.idToken));
          console.log(isLoggedIn);

          navigate("/loggedin");
        })

        .catch((err) => {
          alert(err.message);
        });
    } else {
      const data = {
        email: enteredEmail,
        requestType: "PASSWORD_RESET",
      };
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCIcUCMaO5hHVJlbK7pso9z86iimfWHmpM",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      )
        .then((response) => {
          console.log("Reset", response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(authActions.islogin(token));
    }
  }, []);

  return (
    <div>
      {!isLoggedIn && (
        <section className={classes.auth}>
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>
          <form onSubmit={submitHandler}>
            <div className={classes.control}>
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" ref={emailInputRef} required />
            </div>
            <div className={classes.control}>
              <label htmlFor="password">Your Password</label>
              <input
                type="password"
                id="password"
                ref={passwordInputRef}
                required
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input
                type="password"
                id="confirmpassword"
                ref={confirmPasswordInputRef}
                required
              />
            </div>

            <div className={classes.actions}>
              {!isLoading && (
                <button>{isLogin ? "Login" : "Create Account"}</button>
              )}
              {isLoading && <p>Sending Request... </p>}
              <button
                type="button"
                className={classes.toggle}
                onClick={switchAuthModeHandler}
              >
                {isLogin ? "Create new account" : "Login with existing account"}
              </button>
            </div>
            <div className={classes.actions}>
              <button className={classes.forgot}>Forgot Password</button>
            </div>
          </form>
        </section>
      )}
      {isLoggedIn && (
        <h2 className={classes.loggedInmessage}>
          You Are already logged in, Visit Product section to see our Products
        </h2>
      )}
    </div>
  );
}
