import React, { useState } from 'react';
import UserProfile from '../components/User/UserProfile';
import './css/user.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserHeader from '../components/UserHeader';
import { Container } from 'react-bootstrap';
import UserEdit from '../components/User/UserEdit';

const User: React.FC = () => {

  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);

  return (
    <>
      <UserHeader />
      <Container>
        {showEditProfile ? <UserEdit /> : <UserProfile  />}
      </Container>

    </>
  );
};

export default User;