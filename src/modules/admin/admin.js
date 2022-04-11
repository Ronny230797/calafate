import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import AppBar from '../../components/appbar-basic';
// import "../../styles/admin/admin.scss";

export default function Admin() {
  return (
    <React.Fragment>
      <Container className="admin">
        {/* <AppBar /> */}
        <Row>
          <Col xs={6} md={6}>
            <div className="card-cotainer">
              <Link to="/User">Administrar usuarios</Link>
            </div>
          </Col>
          <Col xs={6} md={6}>
            <div className="card-cotainer">
              <p>
                <Link to="/Dishes">Administrar platos</Link>
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={6}>
            <div className="card-cotainer">
              <Link to="/TypeDish">Administrar el tipo de platillos</Link>
            </div>
          </Col>
          <Col xs={6} md={6}>
            <div className="card-cotainer">
              <Link to="/TypePermission">Administrar el tipo de permisos</Link>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={6}>
            <div className="card-cotainer">
              <Link to="/Role">Administración de roles</Link>
            </div>
          </Col>
          <Col xs={6} md={6}>
            <div className="card-cotainer">
            <Link to="/TypeUser">Administración de los tipos de usuario</Link>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={6}>
            <div className="card-cotainer">
              <Link to="/TypeRole">Administrar los tipos de roles</Link>
            </div>
          </Col>
          <Col xs={6} md={6}>
            <div className="card-cotainer">
              <Link to="/PermissionRole">Administrar la asignación de permisos</Link>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={6}>
            <div className="card-cotainer">
              <Link to="/OrderState">Administrar El estado de las ordenes</Link>
            </div>
          </Col>
          <Col xs={6} md={6}>
            <div className="card-cotainer">
              <Link to="/BusinessUnit">Administrar los locales</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
