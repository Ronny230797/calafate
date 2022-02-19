import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import AppBar from '../../components/appbar-basic';
// import "../../styles/admin/admin.scss";



export default function Admin() {
    return (
        <React.Fragment >
            <Container className='admin'>
                {/* <AppBar /> */}
                <Row >
                    <Col xs={6} md={6}>
                        <div className='card-cotainer'>
                            <p>
                                Usuarios
                            </p>
                        </div>
                    </Col>
                    <Col xs={6} md={6}>
                        <div className='card-cotainer'>
                            <p>
                             Platos
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={6}>
                        <div className='card-cotainer'>
                            <p>
                                Usuarios
                            </p>
                        </div>
                    </Col>
                    <Col xs={6} md={6}>
                        <div className='card-cotainer'>
                            <p>
                             Platos
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row >
                    <Col xs={6} md={6}>
                        <div className='card-cotainer'>
                            <p>
                                Usuarios
                            </p>
                        </div>
                    </Col>
                    <Col xs={6} md={6}>
                        <div className='card-cotainer'>
                            <p>
                             Platos
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row >
                    <Col xs={6} md={6}>
                        <div className='card-cotainer'>
                            <p>
                                Usuarios
                            </p>
                        </div>
                    </Col>
                    <Col xs={6} md={6}>
                        <div className='card-cotainer'>
                            <p>
                             Platos
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>

    );
}