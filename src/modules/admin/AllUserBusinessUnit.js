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
export default function AllDishes() {
  const API_URL_GET_USER_BUSINESS_UNIT =
    "http://localhost:4000/Administration/Admin/GetAllUserBusinessUnit";
  const API_URL_DELETE_USER_BUSINESS_UNIT =
    "http://localhost:4000/Administration/Admin/DeleteUserBusinessUnit";
  const [resData, setresData] = useState([]);
  const alert = useAlert();
  const [dataExists, setdataExists] = useState(true);
  const getUserBusinessUnitRequest = async () => {
    const response = await fetch(API_URL_GET_USER_BUSINESS_UNIT);
    if (response.status === 200) {
      const data = await response.json();
      setresData(data);
    } else {
      setdataExists(false);
    }
  };

  const deleteUserBusinessUnit = async (ID) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ID),
      };
      const response = await fetch(
        API_URL_DELETE_USER_BUSINESS_UNIT,
        requestOptions
      );
      if (response.status === 200) {
        alert.show("Se elimino correctamente.");
        window.location.reload(false);
      } else {
        alert(
          "Ocurrio un error al eliminar al usuario de la unidad de negocio."
        );
      }
    } catch (error) {
      alert.show("Ocurrio un error al eliminar: " + error)
    }
  };

  useEffect(() => {
    getUserBusinessUnitRequest();
  }, []);

  if (dataExists) {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <ListGroup>
                {resData.map((AllUserBusinessUnit) => (
                  <Row key={AllUserBusinessUnit.usuario_Unidad_Negocio_ID}>
                    <Col xs={8} md={8}>
                      <ListGroup.Item>
                        {AllUserBusinessUnit.usuario_Unidad_Negocio_Description}
                      </ListGroup.Item>
                    </Col>
                    <Col xs={4} md={4}>
                      <Link
                        to="/InsertUserBusinessUnit"
                        state={AllUserBusinessUnit.usuario_Unidad_Negocio_ID}
                      >
                        <Button>Modificar</Button>
                      </Link>
                      <Button
                        value={AllUserBusinessUnit.usuario_Unidad_Negocio_ID}
                        onClick={(event) =>
                          deleteUserBusinessUnit(event.target.value)
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
