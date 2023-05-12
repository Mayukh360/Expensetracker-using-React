import React from "react"

const AuthContext=React.createContext({
    token:'',
    email:'',
    isLoggedIn : false,
    login : (token)=>{},
    logout :()=>{},
    autoLogout:()=>{},
    emailPass:(email)=>{},
    totalSum:''
})

export default AuthContext;