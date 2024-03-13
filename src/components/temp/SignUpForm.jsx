import React, { useState } from 'react';
import './SignUpForm.css'; // CSS file for styling

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      username,
      password
    };

    try {
      const response = await fetch('YOUR_BACKEND_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred, please try again later.');
    }
  };

  return (
    <div className="signup-form-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {user && (
        <div className="success-message">
          <p>Registration successful!</p>
          <p>Welcome, {user.username}!</p>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
