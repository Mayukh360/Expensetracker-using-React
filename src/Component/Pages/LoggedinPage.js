import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoggedinPage.css';

export default function LoggedinPage() {
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  async function verifyHandler() {
    const data = {
      requestType: 'VERIFY_EMAIL',
      idToken: token,
    };

    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDXx5szR2zhd9OQlqBegt7PJUE8RXQAqAk',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const responseData = await response.json();
      console.log('Verification email sent:', responseData);
      if (responseData.email === email) {
        setIsEmailVerified(true);
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  }

  const verificationMessage = isEmailVerified ? (
    <h3>Email is verified</h3>
  ) : <h4>Email is not verified</h4>;

  return (
    <div className="logged-in-page bg-gray-100 min-h-screen flex flex-col items-center ">
     <div className="bg-white p-8 rounded shadow-md w-full mt-6">
      <h2 className="text-2xl mb-4">Visit Expense Tracker</h2>
      <Link to="/expensetracker" className="text-blue-500 underline mb-4">Cick Here to Visit Expense Tracker</Link>
      </div>
      <div className="bg-white p-8 mt-4 rounded shadow-md w-full" >
        <h2 className="text-xl mb-4">You are logged in successfully</h2>
        <Link to="/updateprofile" className="text-blue-500 underline">Click here to Update Profile</Link><br/>
      </div>
      <div className="bg-white p-8 mt-4 rounded shadow-md w-full">
        <h2 className="text-xl mb-4">Click Here to Verify Email</h2>
        <button onClick={verifyHandler} className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600">Verify Email</button>
      </div>
      
      {verificationMessage}
    </div>
  );
}
