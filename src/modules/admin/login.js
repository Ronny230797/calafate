import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "../../styles/admin/login.scss";



export default function Login() {


    const API_URL = 'http://localhost:4000/userAdministration/Login/LoginUser';

    const [resData, setresData] = useState([]);
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');


    const loginEvenet = () => {
        let obj = {
            Usuario_Password: password, Usuario_Username: username
        };
        loginRequest(obj);
        console.log(resData);

        if(resData == false || resData == undefined){
            alert('No se puedo verificar su identidad');
        }else{
            window.location.href='/WelcomeCenter';
        }

    };



    const loginRequest = async (obj) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };

        const response = await fetch(API_URL, requestOptions);

        const data = await response.json();
        setresData(data);
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