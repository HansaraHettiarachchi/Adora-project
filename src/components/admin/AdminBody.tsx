import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';


const AdminBody: React.FC = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <SideBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, padding: 20, background: '#f7f9f7' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminBody;
