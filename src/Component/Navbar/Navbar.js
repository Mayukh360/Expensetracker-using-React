import React, { Fragment,useContext } from 'react'
import AuthContext from '../../Store/AuthContext'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate=useNavigate();
    const authCtx=useContext(AuthContext);
    const logoutHandler=()=>{
        authCtx.logout();
        navigate('/');
    }
  return (
    <Fragment>
        <button onClick={logoutHandler}>Logout</button>
    </Fragment>
  )
}
