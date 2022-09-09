import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "../../styles/admin/login.scss";
import { useAlert } from "react-alert";


export default function Login() {


    const API_URL = 'http://localhost:4000/userAdministration/Login/LoginUser';

    const [resData, setresData] = useState([]);
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const alert = useAlert();

    const loginEvenet = () => {
        let obj = {
            Usuario_Password: password, Usuario_Username: username
        };
        loginRequest(obj);

    };



    const loginRequest = (obj) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };

        const response = fetch(API_URL, requestOptions)
        .then((data) => {
            console.log(data)
            setresData(data.json());
            if ((resData != false && resData != undefined) && (data.status == 200 || data.status == 204)) {
                
                localStorage.removeItem('ABRLGN');
                localStorage.setItem('ABRLGN', true);
                window.location.href = '/WelcomeCenter';
            } else {
                alert.show('No se puedo verificar su identidad');
            }
        });

    }

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
                                        <FormControl aria-label="User"
                                            value={username}
                                            type="text"
                                            onChange={event => setusername(`${event.target.value}`)}
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={10} md={10}>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>Password</InputGroup.Text>
                                        <FormControl aria-label="Password"
                                            value={password}
                                            type="text"
                                            onChange={event => setpassword(event.target.value)}
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={12}>
                                    <Button className='button-primary' onClick={loginEvenet}>
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