import React from 'react';
import { Link } from 'react-router-dom';

const AuthFooter: React.FC = () => (
  <div className="text-center mt-3 text-muted">
    Already have an account?{' '}
    <Link to="/login" className="text-primary fw-bold text-decoration-none">
      Login
    </Link>
  </div>
);

export default AuthFooter;