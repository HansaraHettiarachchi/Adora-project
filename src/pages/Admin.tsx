import React from 'react'
import Header from '../components/admin/Header'
import { Container, Row } from 'react-bootstrap'
import SideBar from '../components/admin/SideBar'
import AdminBody from '../components/admin/AdminBody'

export default function Admin() {
    return (
        <>
            <Header />

            <Container fluid="sm">
                <Row>
                    <SideBar />
                    {/* <AdminBody /> */}
                </Row>
            </Container>
        </>
    )
}
