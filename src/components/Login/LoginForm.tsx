import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import AuthFooter from './AuthFooter';
import AuthTitle from './AuthTitle';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === 'admin' && password === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="bg-light p-5 rounded-4 shadow w-100" style={{ maxWidth: '520px' }}>
      <AuthTitle />

      <form onSubmit={handleLogin}>
        <InputField
          type="text"
          name="username"
          placeholder="Username or Email Address"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
        />
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />

        <div className="mb-3 text-end">
          <a href="/forgot-password" className="small text-decoration-none text-primary">
            Forgot Password?
          </a>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-success btn-lg rounded-pill">
            Login
          </button>
        </div>
      </form>

      <AuthFooter />
    </div>
  );
};

export default LoginForm;
