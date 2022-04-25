import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AllOrder() {
  const API_URL_GET_ORDER =
    "http://localhost:4000/Administration/Admin/GetAllOrder";
  const [resData, setresData] = useState([]);
  const [dataExists, setdataExists] = useState(true);
  const getOrderRequest = async () => {
    try {
      const response = await fetch(API_URL_GET_ORDER);
      const data = await response.json();
      setresData(data);
    } catch (err) {
      alert("Ocurrio un error al cargar los datos... " + err);
      setdataExists(false);
    }
  };

  useEffect(() => {
    getOrderRequest();
  }, []);

  if (dataExists) {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <ListGroup>
                {resData.map((AllOrder) => (
                  <Row key={AllOrder.order_ID}>
                    <Col xs={8} md={8}>
                      <ListGroup.Item>
                        {AllOrder.order_Description}
                      </ListGroup.Item>
                    </Col>
                    <Col xs={4} md={4}>
                      <Link
                        to="/ModifyOrder"
                        state={AllOrder.order_ID}
                      >
                        <Button>Modificar</Button>
                      </Link>
                    </Col>
                  </Row>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col>
              <h1>No se encontraron datos ingresados para este apartado</h1>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
