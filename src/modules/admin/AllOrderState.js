import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AllOrderState() {
  const API_URL_GET_ORDER_STATE =
    "http://localhost:4000/Administration/Admin/GetAllOrderState";
  const [resData, setresData] = useState([]);
  const [isError, setisError] = useState(true);

  const getOrderStateRequest = async () => {
    try {
      const response = await fetch(API_URL_GET_ORDER_STATE);
      const data = await response.json();
      setresData(data);
    } catch (err) {
      alert.show("Ocurrio un error al cargar los datos... " + err);
      setisError(true);
    }
  };

  useEffect(() => {
    getOrderStateRequest();
  }, []);

  if (isError) {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <ListGroup>
                {resData.map((AllOrderState) => (
                  <Row key={AllOrderState.order_Estado_ID}>
                    <Col xs={8} md={8}>
                      <ListGroup.Item>
                        Información: {AllOrderState.order_Estado_ID} -{" "}
                        {AllOrderState.order_Estado_Description}
                      </ListGroup.Item>
                    </Col>
                    <Col xs={4} md={4}>
                      <Link
                        to="/InsertOrderState"
                        state={AllOrderState.order_Estado_ID}
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
            <Col xs={12} md={12}>
              <h1>
                No se encuentran estados de orden registradas, u ocurrio un
                error.
              </h1>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
