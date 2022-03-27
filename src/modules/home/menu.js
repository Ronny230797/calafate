import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AppBar from '../../components/appbar-basic';
import MenuImage from '../../assets/Menu.jpg';
import "../../styles/home/menu.scss";


export default function Menu() {

    const API_URL = 'http://localhost:4000/waiter/Dishes/GetAllDishes';

    const [resData, setresData] = useState([]);

    const loginRequest = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setresData(data);
    }

    useEffect(() => {
        loginRequest();
    })

    return (
        <React.Fragment>
            <Container className='menu'>
                <AppBar />
                <Row className='img-container'>
                    <Col xs={12} md={12} >
                        <img className='menu-image' src={MenuImage} />
                    </Col>
                </Row>
                {resData.map((Dishes) =>
                    <Row>
                        <Col xs={8} md={8}>
                            <span key={Dishes.platoID}>{Dishes.plato_Bebida_Nombre}</span>
                        </Col>
                        <Col xs={4} md={4}>
                            <span>${Dishes.precio}</span>
                        </Col>
                    </Row>
                )}
            </Container>
        </React.Fragment>

    );
}