import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';
import AddProduct from './AddProduct';


const AdminBody: React.FC = () => {
  return (
    <div className="d-flex min-vh-100">
      <SideBar />
      <div className="flex-grow-1 d-flex flex-column">
        <Header />

        {/* Schani Develepment */}
        <AddProduct show={false} handleClose={() => { }} />

        <main className="flex-grow-1 p-4" style={{ background: '#f7f9f7' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminBody;
