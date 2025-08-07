import React from 'react';
import UserProfile from '../components/User/UserProfile';
import './css/user.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserHeader from '../components/UserHeader';

const User: React.FC = () => {
  return (
    <>
      <UserHeader />
      <div className="container my-4">
        <UserProfile />
      </div>
    </>
  );
};

export default User;