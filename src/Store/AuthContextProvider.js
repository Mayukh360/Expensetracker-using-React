import React, { useState, useEffect } from 'react'
import AuthContext from './AuthContext';

export default function AuthContextProvider(props)  {
    let initialToken=localStorage.getItem('token');
    const[email,setEmail]=useState();
    
    const [token,setToken]=useState(initialToken);
   
   function autoLogoutHandler(){
      setTimeout(()=>{
        console.log('You have been logged out');
        localStorage.removeItem('token');
        initialToken=null;
      },200000)
    }
    useEffect(()=>{
      autoLogoutHandler();
      const email= localStorage.getItem('email');
      setEmail(email)
    },[])

    const userIsLoggedIn= !!token;

    const loginhandler=(token)=>{
        setToken(token);
        localStorage.setItem('token', token);
    }

    const logoutHandler=()=>{
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }

    const emailPasshandler=(email)=>{
      localStorage.setItem('email',email);
      setEmail(email);
    }

    const contextValue={
        token: token,
        email: email,
        isLoggedIn : userIsLoggedIn,
        login : loginhandler,
        logout : logoutHandler,
        autoLogout:autoLogoutHandler,
        emailPass:emailPasshandler,
        
    }

    // pass contextValue to AuthContext.Provider
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}
