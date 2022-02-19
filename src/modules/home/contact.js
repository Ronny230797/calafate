import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AppBar from '../../components/appbar-basic';
import "../../styles/home/contact.scss";


export default function Menu() {
    return (
        <React.Fragment>
            <Container className='contact'>
                <AppBar />
                <Row>
                    <h2>Horario</h2>
                    <Col xs={6} md={8}>
                        <span>Lunes</span>
                    </Col>
                    <Col xs={6} md={4}>
                        <span>Cerrado</span>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={8}>
                        <span>Martes-Juves</span>
                    </Col>
                    <Col xs={6} md={4}>
                        <span>8 am - 9 pm</span>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={8}>
                        <span>Viernes-Domingos</span>
                    </Col>
                    <Col xs={6} md={4}>
                        <span>8 am - 11 pm</span>
                    </Col>
                </Row>
                <Row>
                    <h2>Telefono</h2>
                    <Col xs={6} md={8}>
                        <span>Phone</span>
                    </Col>
                    <Col xs={6} md={4}>
                        <span>+506 2444 0101</span>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={8}>
                        <span>Phone</span>
                    </Col>
                    <Col xs={6} md={4}>
                        <span>+506 8080 0101</span>
                    </Col>
                </Row>
                <Row>
                    <h2>Correo</h2>
                    <Col xs={6} md={8}>
                        <span>Email</span>
                    </Col>
                    <Col xs={6} md={4}>
                        <span>email@gmail.com</span>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}