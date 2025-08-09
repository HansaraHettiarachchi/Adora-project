import React from 'react';
import SignupForm from '../components/signup/SignupForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/login.css';

const Signup: React.FC = () => (
    <>
        <Header />
        <div className="login-background">
            <SignupForm />
        </div>
        <Footer />
    </>
);

export default Signup;