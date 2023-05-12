import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet }from 'react-router-dom'
import LoggedinPage from '../Pages/LoggedinPage'
import AuthForm from '../Pages/AuthForm'

const router=createBrowserRouter([
    {path:'/loggedin', element: <LoggedinPage/>},
    {path:'/login', element: <AuthForm/>},
])
export default function RenderPage() {
   
  return (
    <RouterProvider router={router} >
        <Outlet/>
    </RouterProvider>
  )
}
