import React from 'react';
import LoginForm from '../components/Login/LoginForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/login.css';

const Login: React.FC = () => (
    <>
        <Header />
        <div className="login-background">
            <LoginForm />
        </div>
        <Footer />
    </>
);

export default Login;
