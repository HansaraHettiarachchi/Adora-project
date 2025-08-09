import React from 'react';
import UserProfile from '../components/User/UserProfile';
import './css/user.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserHeader from '../components/UserHeader';
import { Container } from 'react-bootstrap';

const User: React.FC = () => {
  return (
    <>
      <UserHeader />
      <Container className='d-flex justify-content-center'>
        <Container className='bg-white' style={{ width: "100%", height: "100%" }}>
          <UserProfile />
        </Container>
      </Container>
    </>
  );
};

export default User;