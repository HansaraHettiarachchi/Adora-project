import React from 'react';
import { Link } from 'react-router-dom';

const AuthFooter: React.FC = () => (
  <div className="text-center mt-3 text-muted">
    Don’t have an account?{' '}
    <Link to="/register" className="text-primary fw-bold text-decoration-none">
      Sign Up
    </Link>
  </div>
);

export default AuthFooter;
