 import React from 'react'
 //import { Container, Row } from 'react-bootstrap'
 import AdminBody from '../components/admin/AdminBody'

// export default function Admin() {
//     return (
//         <>
//             <Header />

//             <Container fluid="sm">
//                 <Row>
//                     <SideBar />
//                     <AdminBody />
//                 </Row>
//             </Container>
//         </>
//     )
// }


const Admin: React.FC = () => {
  return <AdminBody />;
};

export default Admin;

