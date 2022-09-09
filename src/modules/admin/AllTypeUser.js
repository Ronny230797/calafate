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
import { useAlert } from "react-alert";
export default function AllTypeUser() {
  const API_URL_GET_TYPE_USER =
    "http://localhost:4000/Administration/Admin/GetAllUserType";
  const API_URL_DELETE_TYPE_USER =
    "http://localhost:4000/Administration/Admin/DeleteUserType";
  const [resData, setresData] = useState([]);
  const [dataExists, setdataExists] = useState(true);
  const alert = useAlert();
  const getUserTypeRequest = async () => {
    try {
      const response = await fetch(API_URL_GET_TYPE_USER);
      const data = await response.json();
      setresData(data);
    } catch (err) {
      alert.show("Ocurrio un error al cargar los datos..." + err);
      setdataExists(false);
    }
  };

  const deleteUserType = async (ID) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ID),
      };
      const response = await fetch(API_URL_DELETE_TYPE_USER, requestOptions);
      if (response.status === 200) {
        alert.show("Se elimino correctamente.");
        window.location.reload(false);
      } else {
        alert.show("Ocurrio un error al eliminar el tipo de usuario.");
      }
    } catch (error) {
      alert.show("Ocurrio un error al eliminar: " + error)
    }
  };

  useEffect(() => {
    getUserTypeRequest();
  }, []);

  if (dataExists) {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <ListGroup>
                {resData.map((AllUserType) => (
                  <Row key={AllUserType.tipo_Usuario_ID}>
                    <Col xs={8} md={8}>
                      <ListGroup.Item>
                        {AllUserType.tipo_Usuario_Name}
                      </ListGroup.Item>
                    </Col>
                    <Col xs={4} md={4}>
                      <Link
                        to="/InsertUserType"
                        state={AllUserType.tipo_Usuario_ID}
                      >
                        <Button>Modificar</Button>
                      </Link>
                      <Button
                        value={AllUserType.tipo_Usuario_ID}
                        onClick={(event) => deleteUserType(event.target.value)}
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
