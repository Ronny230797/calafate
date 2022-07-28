import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/admin/admin.scss";

export default function SalesCenter() {
    return (
        <React.Fragment>
            <Container className="admin">
            <Row>
          <Col xs={12} md={4}>
            <div className="card-cotainer">
              <Link to="/">Administrador de Usuarios</Link>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="card-cotainer">
              <p>
                <Link to="/">Administrador de Platos</Link>
              </p>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="card-cotainer">
              <Link to="/">Administrador de Venta</Link>
            </div>
          </Col>
        </Row>
            </Container>
        </React.Fragment>
    );
}