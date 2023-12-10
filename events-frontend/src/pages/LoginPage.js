import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    let navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setError(''); // Reset error message
  
      try {
        const response = await axios.post('http://localhost:8000/api/token/', { 
          username,
          password,
        });
  
        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;
        // Store the token in local storage or context state
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
  
        // Redirect or change the state upon successful login
        console.log('Logged in successfully:', accessToken);

        navigate("/");
      } catch (err) {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setError(err.response.data.detail || 'Login failed');
        } else {
          // The request was made but no response was received or error occurred in setting up the request
          setError('Login failed. Please try again.');
        }
      }
    };
  
  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
