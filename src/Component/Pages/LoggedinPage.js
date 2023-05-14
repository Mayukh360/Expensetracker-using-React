import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <h2>Email is verified</h2>
  ) : <p>Email is not verified</p>;

  return (
    <div>
      <h2>You are logged in successfully</h2>
      <Link to="/updateprofile">Update</Link>
      <button onClick={verifyHandler}>Verify Email</button>
      {verificationMessage}
    </div>
  );
}
