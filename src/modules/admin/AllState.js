import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
export default function AllState() {
  const API_URL_GET_STATE = "http://localhost:4000/Administration/Admin/GetAllState";
  const API_URL_DELETE_STATE = "http://localhost:4000/Administration/Admin/DeleteState";
  const [resData, setresData] = useState([]);
  const [objSelect, setObjSelect] = useState([]);
  const [dataExists, setdataExists] = useState(true);
  const alert = useAlert();
  const getStateRequest = async () => {
    try {
      const response = await fetch(API_URL_GET_STATE);
      const data = await response.json();
      setresData(data);
    } catch (err) {
      alert.show("Ocurrio un error al cargar los datos... " + err);
      setdataExists(false);
    }
  };

  const deleteState = async (ID) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ID),
      };
      const response = await fetch(API_URL_DELETE_STATE, requestOptions);
      if (response.status === 200) {
        alert.show("Se elimino correctamente.");
        window.location.reload(false);
      } else {
        alert.show("Ocurrio un error al eliminar el estado del platillo.");
      }
    } catch (error) {
      alert.show("Ocurrio un errro al eliminar: " + error);
    }
  };

  useEffect(() => {
    getStateRequest();
  }, []);

  if (dataExists) {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <ListGroup>
                {resData.map((AllState) => (
                  <Row key={AllState.estado_ID}>
                    <Col xs={8} md={8}>
                      <ListGroup.Item>{AllState.estado_Name}</ListGroup.Item>
                    </Col>
                    <Col xs={4} md={4}>
                      <Link to="/InsertState" state={AllState.estado_ID}>
                        <Button>Modificar</Button>
                      </Link>
                      <Button
                        value={AllState.estado_ID}
                        onClick={(event) => deleteState(event.target.value)}
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
