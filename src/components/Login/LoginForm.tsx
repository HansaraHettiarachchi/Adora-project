import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import AuthFooter from './AuthFooter';
import AuthTitle from './AuthTitle';
import axiosInstance from '../../util/axiosUtil';
import Swal from 'sweetalert2';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Call backend login
      const response = await axiosInstance.post('users/login', {
        email: username.trim(),
        password: password.trim()
      });

      if (response.data.token) {
        localStorage.setItem('jwtToken', response.data.token);
        Swal.fire({
          title: 'Login Successful',
          icon: 'success',
          confirmButtonColor: '#23B540',
          confirmButtonText: 'Continue'
        }).then(() => {
          
          console.log(localStorage.getItem("jwtToken"));
          navigate('/home');
        });
      } else {
        Swal.fire({
          title: 'Login Failed',
          text: 'Invalid credentials. Please try again.',
          icon: 'error',
          confirmButtonColor: '#23B540',
          confirmButtonText: 'OK'
        });
      }


    } catch (error: any) {
      setError(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
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

        {error && <div className="text-danger mb-3">{error}</div>}

        <div className="mb-3 text-end">
          <a href="/forgot-password" className="small text-decoration-none text-primary">
            Forgot Password?
          </a>
        </div>

        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-success btn-lg rounded-pill"
            disabled={loading} // prevents multiple clicks while logging in
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

      </form>

      <AuthFooter />
    </div>
  );
};

export default LoginForm;
