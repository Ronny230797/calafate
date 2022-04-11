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

export default function AllDishes() {
  const API_URL_GET_USER = "http://localhost:4000/Administration/Admin/GetAllUser";
  const API_URL_DELETE_USER = "http://localhost:4000/Administration/Admin/DeleteUser";
  const [resData, setresData] = useState([]);

  const getUserRequest = async () => {
    const response = await fetch(API_URL_GET_USER);
    const data = await response.json();
    setresData(data);
  };

  const deleteUser = async (ID) => {
    console.log(ID)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_URL_DELETE_USER, requestOptions);
    const data = await response.json();
  };

  useEffect(() => {
    getUserRequest();
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col xs={12} md={12}>
            <ListGroup>
              {resData.map((AllUser) => (
                <Row key={AllUser.usuario_ID}>
                  <Col xs={8} md={8}>
                    <ListGroup.Item>
                      {AllUser.firstName} {AllUser.usuario_First_Last_Name} {AllUser.usuario_Second_Last_Name} - {AllUser.usuario_Username}
                    </ListGroup.Item>
                  </Col>
                  <Col xs={4} md={4}>
                    <Link to="/InsertUser" state={AllUser.usuario_ID}>
                      <Button>Modificar</Button>
                    </Link>
                    <Button value={AllUser.usuario_ID} onClick={(event) => deleteUser(event.target.value)}>Eliminar</Button>
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
