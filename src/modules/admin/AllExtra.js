import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AllExtra() {
  const API_URL_GET_PRODUCT =
    "http://localhost:4000/Administration/Admin/GetAllExtra";
  const API_URL_DELETE_PRODUCT =
    "http://localhost:4000/Administration/Admin/DeleteExtra";
  const [resData, setresData] = useState([]);
  const [dataExists, setdataExists] = useState(true);

  const getExtraRequest = async () => {
    const response = await fetch(API_URL_GET_PRODUCT);
    if (response.status === 200) {
      const data = await response.json();
      setresData(data);
    } else {
      setdataExists(false);
    }
  };

  const deleteExtra = async (ID) => {
    console.log(ID);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_URL_DELETE_PRODUCT, requestOptions);
    const data = await response.json();
  };

  useEffect(() => {
    getExtraRequest();
  }, []);

  if (dataExists) {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <ListGroup>
                {resData.map((AllExtra) => (
                  <Row key={AllExtra.extra_ID}>
                    <Col xs={8} md={8}>
                      <ListGroup.Item>{AllExtra.extra_Name}</ListGroup.Item>
                    </Col>
                    <Col xs={4} md={4}>
                      <Link to="/InsertExtra" state={AllExtra.extra_ID}>
                        <Button>Modificar</Button>
                      </Link>
                      <Button
                        value={AllExtra.extra_ID}
                        onClick={(event) => deleteExtra(event.target.value)}
                      >
                        Eliminar
                      </Button>
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
