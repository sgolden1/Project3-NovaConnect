import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const { signUp, authSuccess } = useContext(AuthContext);

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    await signUp(email, password, displayName);
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignUp} className="signup-form">
        <h1>Sign Up</h1>
        <input
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
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
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        {authSuccess && <p className="auth-message">{authSuccess}</p>}
      </form>
    </div>
  );
};

export default SignUp;
