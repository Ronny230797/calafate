import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AllRole() {
  const API_URL_GET_ROLE = "http://localhost:4000/Administration/Admin/GetAllRole";
  const API_URL_DELETE_ROLE = "http://localhost:4000/Administration/Admin/DeleteRole";
  const [resData, setresData] = useState([]);

  const getRoleRequest = async () => {
    const response = await fetch(API_URL_GET_ROLE);
    const data = await response.json();
    setresData(data);
  };

  const deleteRole = async (ID) => {
    console.log(ID)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_URL_DELETE_ROLE, requestOptions);
    if(response.status == 200) {
        alert("Se elimino correctamente");
    }
  };

  useEffect(() => {
    getRoleRequest();
  }, []);

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
                    <Button value={AllRole.role_ID} onClick={(event) => deleteRole(event.target.value)}>Eliminar</Button>
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
