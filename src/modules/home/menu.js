import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AppBar from '../../components/appbar-basic';
import MenuImage from '../../assets/Menu.jpg';
import "../../styles/home/menu.scss";


export default function Menu() {
    return (
        <React.Fragment>
            <Container className='menu'>
                <AppBar />
                <Row className='img-container'>
                    <Col xs={12} xs={12} md={12} >
                        <img className='menu-image' src={MenuImage} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={8} md={8}>
                        <span>Descripci[on</span>
                    </Col>
                    <Col xs={4} md={4}>
                        <span>Precio</span>
                    </Col>
                </Row>
                <Row>
                    <Col xs={8} md={8}>
                        <span>Casado con (Pollo, Pescado, Bistec)</span>
                    </Col>
                    <Col xs={4} md={4}>
                        <span>$2500</span>
                    </Col>
                </Row>
                <Row>
                    <Col xs={8} md={8}>
                        <span>Taco con papas</span>
                    </Col>
                    <Col xs={4} md={4}>
                        <span>$2500</span>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>

    );
}