import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AllState() {
  const API_URL_GET_STATE = "http://localhost:4000/Administration/Admin/";
  const API_URL_DELETE_STATE = "http://localhost:4000/Administration/Admin/";
  const [resData, setresData] = useState([]);
  const [objSelect, setObjSelect] = useState([]);

  const getStateRequest = async () => {
    const response = await fetch(API_URL_GET_STATE);
    const data = await response.json();
    setresData(data);
  };

  const deleteState = async (ID) => {
    console.log(ID)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_URL_DELETE_STATE, requestOptions);
    if(response.status == 200) {
        alert("Se elimino correctamente");
    }
  };

  useEffect(() => {
    getStateRequest();
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col xs={12} md={12}>
            <ListGroup>
              {resData.map((AllState) => (
                <Row key={AllState.estado_ID}>
                  <Col xs={8} md={8}>
                    <ListGroup.Item>
                      {AllState.estado_Name}
                    </ListGroup.Item>
                  </Col>
                  <Col xs={4} md={4}>
                    <Link to="/InsertState" state={AllState.estado_ID}>
                      <Button>Modificar</Button>
                    </Link>
                    <Button value={AllState.estado_ID} onClick={(event) => deleteState(event.target.value)}>Eliminar</Button>
                  </Col>
                </Row>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
