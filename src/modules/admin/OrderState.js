import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function OrderState() {
  return (
    <React.Fragment>
      <Container className="menu">
        <Row>
          <Col xs={6} md={6}>
            <div className="card-cotainer">
              <p>Modificar el estado de una orden.</p>
              <Link to="/AllOrderState"><Button>Acceder</Button></Link>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
