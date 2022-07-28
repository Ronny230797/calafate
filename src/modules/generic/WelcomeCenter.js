import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/admin/admin.scss";

export default function Admin() {
    return (
        <React.Fragment>
            <Container className="admin">
            <Row>
          <Col xs={12} md={4}>
            <div className="card-cotainer">
              <Link to="/UsersCenter">Administrador de Usuarios</Link>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="card-cotainer">
              <p>
                <Link to="/DishesCenter">Administrador de Platos</Link>
              </p>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="card-cotainer">
              <Link to="/SalesCenter">Administrador de Venta</Link>
            </div>
          </Col>
        </Row>
            </Container>
        </React.Fragment>
    );
}