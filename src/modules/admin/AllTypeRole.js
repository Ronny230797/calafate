import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
export default function AllTypeRole() {
  const API_URL_GET_TYPE_ROLE =
    "http://localhost:4000/Administration/Admin/GetAllTypeRole";
  const API_URL_DELETE_TYPE_ROLE =
    "http://localhost:4000/Administration/Admin/DeleteTypeRole";
  const [resData, setresData] = useState([]);
  const [dataExists, setdataExists] = useState(true);
  const alert = useAlert();
  const getTypeDishRequest = async () => {
    try {
      const response = await fetch(API_URL_GET_TYPE_ROLE);
      const data = await response.json();
      setresData(data);
    } catch (err) {
      alert.show("Ocurrio un error al cargar los datos... " + err);
      setdataExists(false);
    }
  };

  const deleteTypeRole = async (ID) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ID),
      };
      const response = await fetch(API_URL_DELETE_TYPE_ROLE, requestOptions);
      if (response.status === 200) {
        alert.show("Se elimino correctamente.");
        window.location.reload(false);
      } else {
        alert.show("Ocurrio un error al eliminar el tipo de role.");
      }
    } catch (error) {
      alert.show("Ocurrio un error al eliminar: " + error)
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
