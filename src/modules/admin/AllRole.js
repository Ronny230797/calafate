import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AllRole() {
  const API_URL_GET_ROLE =
    "http://localhost:4000/Administration/Admin/GetAllRole";
  const API_URL_DELETE_ROLE =
    "http://localhost:4000/Administration/Admin/DeleteRole";
  const [resData, setresData] = useState([]);
  const [dataExists, setdataExists] = useState(true);

  const getRoleRequest = async () => {
    try {
      const response = await fetch(API_URL_GET_ROLE);
      const data = await response.json();
      setresData(data);
    } catch (err) {
      alert("Ocurrio un error al cargar los datos... " + err);
      setdataExists(false);
    }
  };

  const deleteRole = async (ID) => {
    try {
      console.log(ID);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ID),
      };
      const response = await fetch(API_URL_DELETE_ROLE, requestOptions);
      if (response.status === 200) {
        alert("Se elimino correctamente.");
      } else {
        alert("Ocurrio un error al eliminar el role.");
      }
    } catch (error) {
      alert("Ocurrio un error al eliminar: " + error)
    }
  };

  useEffect(() => {
    getRoleRequest();
  }, []);

  if (dataExists) {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <ListGroup>
                {resData.map((AllRole) => (
                  <Row key={AllRole.role_ID}>
                    <Col xs={8} md={8}>
                      <ListGroup.Item>
                        {AllRole.role_Description}
                      </ListGroup.Item>
                    </Col>
                    <Col xs={4} md={4}>
                      <Link to="/InsertRole" state={AllRole.role_ID}>
                        <Button>Modificar</Button>
                      </Link>
                      <Button
                        value={AllRole.role_ID}
                        onClick={(event) => deleteRole(event.target.value)}
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
