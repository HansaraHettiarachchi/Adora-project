import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/login.css';
import BreadcrumbBar from '../components/BreadcrumbBar'
import SignupForm from '../components/Signup/SignupForm';


const Signup: React.FC = () => (
    <>
        <Header />

        <BreadcrumbBar currentPage="Signup" />
        <div className="login-background">
            <SignupForm />
        </div>
        <Footer />
    </>
);

export default Signup;