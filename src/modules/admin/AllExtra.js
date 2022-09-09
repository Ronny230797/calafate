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

export default function AllExtra() {
  const API_URL_GET_PRODUCT =
    "http://localhost:4000/Administration/Admin/GetAllExtra";
  const API_URL_DELETE_PRODUCT =
    "http://localhost:4000/Administration/Admin/DeleteExtra";
  const [resData, setresData] = useState([]);
  const [dataExists, setdataExists] = useState(true);
  const alert = useAlert();
  const getExtraRequest = async () => {
    try {
      const response = await fetch(API_URL_GET_PRODUCT);
      const data = await response.json();
      setresData(data);
    } catch (err) {
      console.log("Ocurrio un error al cargar los datos... " + err);
      setdataExists(false);
    }
  };

  const deleteExtra = async (ID) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ID),
      };
      const response = await fetch(API_URL_DELETE_PRODUCT, requestOptions);
      if (response.status === 200) {
        alert.show("Se elimino correctamente.");
        window.location.reload(false);
      } else {
        alert.show("Ocurrio un error al eliminar la extra del platillo.");
      }
    } catch (error) {
      alert.show("Ocurrio un errro al eliminar: " + error);
    }
  };

  useEffect(() => {
    getExtraRequest();
  }, []);

  if (dataExists) {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <ListGroup>
                {resData.map((AllExtra) => (
                  <Row key={AllExtra.extra_ID}>
                    <Col xs={8} md={8}>
                      <ListGroup.Item>{AllExtra.extra_Name}</ListGroup.Item>
                    </Col>
                    <Col xs={4} md={4}>
                      <Link to="/InsertExtra" state={AllExtra.extra_ID}>
                        <Button>Modificar</Button>
                      </Link>
                      <Button
                        value={AllExtra.extra_ID}
                        onClick={(event) => deleteExtra(event.target.value)}
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
