import React from 'react';
import LoginForm from '../components/login/LoginForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/login.css';
import BreadcrumbBar from '../components/BreadcrumbBar'


const Login: React.FC = () => (
    <>
        <Header />
        <BreadcrumbBar currentPage="Login"/>
        <div className="login-background">
            <LoginForm />
        </div>
        <Footer />
    </>
);

export default Login;
