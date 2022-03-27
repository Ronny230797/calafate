import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function InsertDish() {
  const API_URL = "http://localhost:4000/Administration/Admin/InsertDish";
  const API_URL_GET_Type = "http://localhost:4000/Administration/Admin/GetTypeDish";

  const [resData, setresData] = useState([]);
  const [typeDishData, setTypeDishData] = useState([]);
  const [typeNewDish, setTypeNewDish] = useState([]);
  const [nameNewDish, setNameNewDish] = useState([]);
  const [descriptionNewDish, setDescriptionNewDish] = useState([]);
  const [priceNewDish, setPriceNewDish] = useState([]);

  const InsertRequest = async (obj) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    };
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    setresData(data);
  };

  const getTypeDishRequest = async () => {
    const response = await fetch(API_URL_GET_Type);
    const data = await response.json();
    setTypeDishData(data);
  };

  useEffect(() => {
    getTypeDishRequest();
  });

  return (
    <React.Fragment>
      <Container className="menu">
        <Row>
          <Col xs={10} md={10}>
            <InputGroup className="mb-3">
              <InputGroup.Text>Tipo platillo</InputGroup.Text>
              <FormControl
                aria-label="Tipo platillo"
                value={typeNewDish}
                type="text"
                onChange={(event) => setTypeNewDish(`${event.target.value}`)}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={10} md={10}>
            <InputGroup className="mb-3">
              <InputGroup.Text>Nombre del platillo/Bebida</InputGroup.Text>
              <FormControl
                aria-label="Platillo/Bebida"
                value={nameNewDish}
                type="text"
                onChange={(event) => setNameNewDish(event.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={10} md={10}>
            <InputGroup className="mb-3">
              <InputGroup.Text>Descripcion del platillo/Bebida</InputGroup.Text>
              <FormControl
                aria-label="Descripción"
                value={descriptionNewDish}
                type="text"
                onChange={(event) => setDescriptionNewDish(event.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={10} md={10}>
            <InputGroup className="mb-3">
              <InputGroup.Text>Precio del platillo/Bebida</InputGroup.Text>
              <FormControl
                aria-label="Precio venta"
                value={priceNewDish}
                type="text"
                onChange={(event) => setPriceNewDish(event.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
