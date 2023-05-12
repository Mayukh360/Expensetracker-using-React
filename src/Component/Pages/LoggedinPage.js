import React from 'react'
import { Link } from 'react-router-dom'

export default function LoggedinPage() {
  return (
    <div><h2>You are logged in successfully</h2>
    <Link as={Link} to="/updateprofile">Update</Link>
    </div>
  )
}
