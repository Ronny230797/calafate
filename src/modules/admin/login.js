import React from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import "../../styles/admin/login.scss";



export default function Login() {
    return (
        <React.Fragment >
            <Container className='login'>
                <Row>
                    <Col xs={12} md={12}>
                        <div className='login-card'>
                        <Row>
                                <Col xs={12} md={12}>
                                    <h1>Calafate</h1>
                                    <h3>Welcome!</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={10} md={10}>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>User</InputGroup.Text>
                                        <FormControl aria-label="User" />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={10} md={10}>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>Password</InputGroup.Text>
                                        <FormControl aria-label="Password" />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={12}>
                                    <Button className='button-primary'>
                                        Log in
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>

    );
}