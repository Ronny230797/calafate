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

export default function AllPermissionRole() {
  const API_URL_GET_PERMISSION_ROLE =
    "http://localhost:4000/Administration/Admin/GetAllPermissionRole";
  const API_URL_DELETE_Dish =
    "http://localhost:4000/Administration/Admin/DeletePermissionRole";
  const [resData, setresData] = useState([]);
  const [dataExists, setdataExists] = useState(true);

  const getPermissionRoleRequest = async () => {
    try {
      const response = await fetch(API_URL_GET_PERMISSION_ROLE);
      const data = await response.json();
      setresData(data);
    } catch (err) {
      setdataExists(false);
      alert("Ocurrio un error al cargar los datos o aun no existen... " + err);
    }
  };

  const deletePermissionRole = async (ID) => {
    try {
      console.log(ID);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ID),
      };
      const response = await fetch(API_URL_DELETE_Dish, requestOptions);
      if (response.status === 200) {
        alert("Se elimino correctamente.");
        window.location.reload(false);
      } else {
        alert("Ocurrio un error al eliminar el platillo.");
      }
    } catch (error) {
      alert("Ocurrio un error al eliminar: " + error)
    }
  };

  useEffect(() => {
    getPermissionRoleRequest();
  }, []);

  if (dataExists) {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <ListGroup>
                {resData.map((AllPermissionRole) => (
                  <Row key={AllPermissionRole.permiso_Role_ID}>
                    <Col xs={8} md={8}>
                      <ListGroup.Item>
                        Tipo de permiso: {AllPermissionRole.fK_TipoPermiso_Permiso_Role} - Tipo role: {AllPermissionRole.fK_TipoRole_Permiso_Role}
                      </ListGroup.Item>
                    </Col>
                    <Col xs={4} md={4}>
                      <Link to="/InsertPermissionRole" state={AllPermissionRole.platoID}>
                        <Button>Modificar</Button>
                      </Link>
                      <Button
                        value={AllPermissionRole.platoID}
                        onClick={(event) => deletePermissionRole(event.target.value)}
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
