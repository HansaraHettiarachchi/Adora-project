import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import AuthFooter from './AuthFooter';
import AuthTitle from './AuthTitle';
import axiosInstance from '../../util/axiosUtil';
import Swal from 'sweetalert2';
import JwtUtil from '../../util/JwtUtil';

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

          const token = response.data.token;
          let userRoleId = 0;
          if (token) {
            try {
              const payload = JwtUtil.decodeToken(token);
              console.log(payload);
              
              userRoleId = payload?.user_role_id || 4;
            } catch (err) {
              navigate('/home');
              return;
            }
          }

          if (userRoleId <= 3) {
            Swal.fire({
              title: 'Choose Your Dashboard',
              text: 'You have admin privileges. Where would you like to go?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'Go to Admin Panel',
              cancelButtonText: 'Continue to Website',
              confirmButtonColor: '#23B540',
              cancelButtonColor: '#3085d6'
            }).then((result) => {
              if (result.isConfirmed) {
                navigate('/admin');
              } else {
                navigate('/home');
              }
            });
          } else {
            navigate('/home');
          }
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
