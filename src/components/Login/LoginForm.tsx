import React from 'react';
import InputField from './InputField';
import AuthFooter from './AuthFooter';
import AuthTitle from './AuthTitle';

const LoginForm: React.FC = () => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
  };

  return (
    <div className="bg-light p-5 rounded-4 shadow w-100" style={{ maxWidth: '520px' }}>
      <AuthTitle />

      <form onSubmit={handleLogin}>
        <InputField type="text" name="username" placeholder="Username or Email Address" />
        <InputField type="password" name="password" placeholder="Password" />

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
