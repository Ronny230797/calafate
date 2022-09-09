import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

export default function AllTypePermission() {
  const API_URL_GET_TYPE_PERMISSION =
    "http://localhost:4000/Administration/Admin/GetAllTypePermission";
  const API_URL_DELETE_TYPE_PERMISSION =
    "http://localhost:4000/Administration/Admin/DeleteTypePermission";
  const [resData, setresData] = useState([]);
  const [dataExists, setdataExists] = useState(true);
  const alert = useAlert();
  const getTypePermissionRequest = async () => {
    try {
      const response = await fetch(API_URL_GET_TYPE_PERMISSION);
      const data = await response.json();
      setresData(data);
    } catch (err) {
      alert.show("Ocurrio un error al cargar los datos... " + err);
      setdataExists(false);
    }
  };

  const deleteTypePermission = async (ID) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ID),
      };
      const response = await fetch(
        API_URL_DELETE_TYPE_PERMISSION,
        requestOptions
      );
      if (response.status === 200) {
        alert.show("Se elimino correctamente.");
        window.location.reload(false);
      } else {
        alert.show("Ocurrio un error al eliminar el tipo de permiso.");
      }
    } catch (error) {
      alert.show("Ocurrio un error al eliminar: " + error)
    }
  };

  useEffect(() => {
    getTypePermissionRequest();
  }, []);

  if (dataExists) {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <ListGroup>
                {resData.map((AllTypePermissions) => (
                  <Row key={AllTypePermissions.tipo_Permiso_ID}>
                    <Col xs={8} md={8}>
                      <ListGroup.Item>
                        {AllTypePermissions.tipo_Permiso_Name}
                      </ListGroup.Item>
                    </Col>
                    <Col xs={4} md={4}>
                      <Link
                        to="/InsertTypePermission"
                        state={AllTypePermissions.tipo_Permiso_ID}
                      >
                        <Button>Modificar</Button>
                      </Link>
                      <Button
                        value={AllTypePermissions.tipo_Permiso_ID}
                        onClick={(event) =>
                          deleteTypePermission(event.target.value)
                        }
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
