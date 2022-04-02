import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function TypePermission() {
  return (
    <React.Fragment>
      <Container className="menu">
        <Row>
          <Col xs={6} md={6}>
            <div className="card-cotainer">
              <p>Insertar nuevo tipo de permiso</p>
              <Link to="/">
                <Button>Acceder</Button>
              </Link>
            </div>
          </Col>
          <Col xs={6} md={6}>
            <div className="card-cotainer">
              <p>Modificar o Eliminar existentes</p>
              <Link to="/">
                <Button>Acceder</Button>
              </Link>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={6}>
            <div className="card-cotainer">
              <p>Buscador</p>
              <Link to="/">
                <Button>Acceder</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
