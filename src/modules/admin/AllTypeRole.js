import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AllTypeRole() {
  const API_URL_GET_TYPE_ROLE =
    "http://localhost:4000/Administration/Admin/GetAllTypeRole";
  const API_URL_DELETE_TYPE_ROLE =
    "http://localhost:4000/Administration/Admin/DeleteTypeRole";
  const [resData, setresData] = useState([]);
  const [dataExists, setdataExists] = useState(true);

  const getTypeDishRequest = async () => {
    try {
      const response = await fetch(API_URL_GET_TYPE_ROLE);
      const data = await response.json();
      setresData(data);
    } catch (err) {
      alert("Ocurrio un error al cargar los datos... " + err);
      setdataExists(false);
    }
  };

  const deleteTypeRole = async (ID) => {
    console.log(ID);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_URL_DELETE_TYPE_ROLE, requestOptions);
    if (response.status == 200) {
      alert("Se elimino correctamente");
    }
  };

  useEffect(() => {
    getTypeDishRequest();
  }, []);

  if (dataExists) {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <ListGroup>
                {resData.map((AllTypeRole) => (
                  <Row key={AllTypeRole.tipo_Role_ID}>
                    <Col xs={8} md={8}>
                      <ListGroup.Item>
                        {AllTypeRole.tipo_Role_Name}
                      </ListGroup.Item>
                    </Col>
                    <Col xs={4} md={4}>
                      <Link
                        to="/InsertTypeRole"
                        state={AllTypeRole.tipo_Role_ID}
                      >
                        <Button>Modificar</Button>
                      </Link>
                      <Button
                        value={AllTypeRole.tipo_Role_ID}
                        onClick={(event) => deleteTypeRole(event.target.value)}
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
