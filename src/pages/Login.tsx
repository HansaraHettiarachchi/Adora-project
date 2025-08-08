import React from 'react';
import LoginForm from '../components/Login/LoginForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login: React.FC = () => (
    <>
        <Header />
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{
                backgroundImage: "url('/src/assets/images/banner2.png')",
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover', // Added this line
            }}
        >
            <LoginForm />
        </div>
        <Footer />
    </>
);

export default Login;
