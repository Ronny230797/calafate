import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/admin/admin.scss";

export default function UsersCenter() {
    return (
        <React.Fragment>
            <Container className="admin">
                <Row>
                    <Col xs={12} md={6}>
                        <div className="card-cotainer">
                            <Link to="/TypeUser">Tipo de Usuarios</Link>
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="card-cotainer">
                            <p>
                                <Link to="/User">Usuarios</Link>
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <div className="card-cotainer">
                            <Link to="/TypeRole">Tipo de Roles</Link>
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="card-cotainer">
                            <p>
                                <Link to="/Role">Roles</Link>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}