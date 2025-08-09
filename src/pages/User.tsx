import React from 'react';
import UserProfile from '../components/user/UserProfile';
import './css/user.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserHeader from '../components/UserHeader';
import { Container } from 'react-bootstrap';
import UserEdit from '../components/user/UserEdit';

const User: React.FC = () => {
  return (
    <>
      <UserHeader />
      <Container fluid='sm'>
        {/* <UserProfile /> */}
        <UserEdit />
      </Container>

    </>
  );
};

export default User;