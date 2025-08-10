import React from 'react';
import InputField from '../login/InputField';
import AuthFooter from './AuthFooter';
import AuthTitle from '../login/AuthTitle';

const SignupForm: React.FC = () => {
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic
  };

  return (
    <div className="bg-light p-5 rounded-4 shadow w-100" style={{ maxWidth: '520px' }}>
      <AuthTitle />

      <form onSubmit={handleSignup}>
        <InputField type="text" name="username" placeholder="Username" />
        <InputField type="email" name="email" placeholder="Email Address" />
        <InputField type="password" name="password" placeholder="Password" />
        <InputField type="password" name="confirmPassword" placeholder="Confirm Password" />

        <div className="d-grid mt-3">
          <button type="submit" className="btn btn-success btn-lg rounded-pill">
            Sign Up
          </button>
        </div>
      </form>

      <AuthFooter />
    </div>
  );
};

export default SignupForm;