import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Dishes() {
  const API_URL = "http://localhost:4000/waiter/Dishes/GetAllDishes";

  const [resData, setresData] = useState([]);

  const getDishRequest = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setresData(data);
  };

  useEffect(() => {
    getDishRequest();
  },[]);

  return (
    <React.Fragment>
      <Container className="menu">
        <Row>
          <Col xs={6} md={6}>
            <div className="card-cotainer">
              <p>Insertar nuevo platillo/Bebida</p>
              <Link to="/InsertDish"><Button>Acceder</Button></Link>
            </div>
          </Col>
          <Col xs={6} md={6}>
            <div className="card-cotainer">
              <p>Modificar existentes</p>
              <Link to="/"><Button>Acceder</Button></Link>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={6}>
            <div className="card-cotainer">
              <p>Buscador</p>
              <Link to="/InsertDish"><Button>Acceder</Button></Link>
            </div>
          </Col>
          <Col xs={6} md={6}>
            <div className="card-cotainer">
              <p>Eliminar existente</p>
              <Link to="/InsertDish"><Button>Acceder</Button></Link>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
