import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet }from 'react-router-dom'
import LoggedinPage from '../Pages/LoggedinPage'
import AuthForm from '../Pages/AuthForm'
import UpdateProfile from '../Pages/UpdateProfile'

const router=createBrowserRouter([
    {path:'/loggedin', element: <LoggedinPage/>},
    // {path:'/login', element: <AuthForm/>},
    {path:'/', element: <AuthForm/>},
    {path:'/updateprofile', element: <UpdateProfile/>},
])
export default function RenderPage() {
   
  return (
    <RouterProvider router={router} >
        <Outlet/>
    </RouterProvider>
  )
}
