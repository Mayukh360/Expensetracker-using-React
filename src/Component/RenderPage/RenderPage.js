import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet }from 'react-router-dom'
import LoggedinPage from '../Pages/LoggedinPage'
import AuthForm from '../Pages/AuthForm'
import UpdateProfile from '../Pages/UpdateProfile'
import ExpenseTracker from '../Pages/ExpenseTracker'

const router=createBrowserRouter([
    {path:'/loggedin', element: <LoggedinPage/>},
    // {path:'/login', element: <AuthForm/>},
    {path:'/Expensetracker-using-React', element: <AuthForm/>},
    {path:'/updateprofile', element: <UpdateProfile/>},
    {path:'/expensetracker', element: <ExpenseTracker/>},
])
export default function RenderPage() {
   
  return (
    <RouterProvider router={router} >
        <Outlet/>
    </RouterProvider>
  )
}
