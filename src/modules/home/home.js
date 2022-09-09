import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Entrada from '../../assets/Entrada.jpg';
import AppBar from '../../components/appbar-basic';
import "../../styles/home/home.scss";



export default function Home() {
    useEffect(() => {
        localStorage.setItem('ABRLGN', false);                    
      }, []);

    return (
        <React.Fragment >
            <Container className='home'>
                <AppBar />
                <Row className='container_info'>
                    <Col xs={12} md={8} className='img_container'>
                        <img className='img_admission' src={Entrada} />
                    </Col>
                    <Col xs={12} md={4}>
                        <div className='card-cotainer'>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>

    );
}