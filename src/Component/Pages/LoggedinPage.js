import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LoggedinPage.css';
import { useDispatch } from 'react-redux';
import { authActions } from '../../storee/AuthReducer';

export default function LoggedinPage() {
  const dispatch= useDispatch();
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

  useEffect(() => {
    // const token = localStorage.getItem("token");
    if (token) {
      dispatch(authActions.islogin(token));
    } 
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8">
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md mt-6">
      <h2 className="text-2xl mb-4">Visit Expense Tracker</h2>
      <Link to="/expensetracker" className="text-blue-500 underline mb-4">Click Here to Visit Expense Tracker</Link>
    </div>
    <div className="bg-white p-8 mt-4 rounded shadow-md w-full max-w-md">
      <h2 className="text-xl mb-4">You are logged in successfully</h2>
      <Link to="/updateprofile" className="text-blue-500 underline">Click here to Update Profile</Link><br/>
    </div>
    <div className="bg-white p-8 mt-4 rounded shadow-md w-full max-w-md">
      <h2 className="text-xl mb-4">Click Here to Verify Email</h2>
      <button onClick={verifyHandler} className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600">Verify Email</button>
    </div>
    <div className="bg-white p-8 mt-4 rounded shadow-md w-full max-w-md">
      <h2 className="text-xl mb-4">Verification Status</h2>
      <div className={isEmailVerified ? 'text-green-500' : 'text-red-500'}>
        {verificationMessage}
      </div>
    </div>
  </div>

  );
}
