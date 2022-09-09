import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/admin/admin.scss";
import AppBarLogged from '../../components/appbar-logged.js';

export default function DishesCenter() {
    return (
        <React.Fragment>
            <Container className="admin">
              <AppBarLogged />
            <Row>
          <Col xs={12} md={6}>
            <div className="card-cotainer">
              <Link to="/TypeDish">Tipo Platillo</Link>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="card-cotainer">
              <p>
                <Link to="/Dishes">Platillo</Link>
              </p>
            </div>
          </Col>
        </Row>
            </Container>
        </React.Fragment>
    );
}