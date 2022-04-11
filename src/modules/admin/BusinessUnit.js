import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function BusinessUnit() {
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col xs={6} md={6}>
            <div className="card-cotainer">
              <p>Insertar un nuevo local</p>
              <Link to="/InsertBusinessUnit">
                <Button>Acceder</Button>
              </Link>
            </div>
          </Col>
          <Col xs={6} md={6}>
            <div className="card-cotainer">
              <p>Modificar o Eliminar un local existente.</p>
              <Link to="/AllBusinessUnit">
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
