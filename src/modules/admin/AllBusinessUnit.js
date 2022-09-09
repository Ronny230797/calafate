import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

export default function AllBusinessUnit() {
  const API_URL_GET_BUSINESS_UNIT =
    "http://localhost:4000/Administration/Admin/GetAllBusinessUnit";
  const API_URL_DELETE_BUSINESS_UNIT =
    "http://localhost:4000/Administration/Admin/DeleteBusinessUnit";
  const [resData, setresData] = useState([]);
  const [dataExists, setdataExists] = useState(true);
  const alert = useAlert();
  const getBusinessUnitRequest = async () => {
    try {
      const response = await fetch(API_URL_GET_BUSINESS_UNIT);
      const data = await response.json();
      setresData(data);
    } catch (err) {
      setdataExists(false);
      alert.show("Ocurrio un error al cargar los datos... " + err);
    }
  };

  const deleteBusinessUnit = async (ID) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ID),
      };
      const response = await fetch(
        API_URL_DELETE_BUSINESS_UNIT,
        requestOptions
      );
      const data = await response.json();
      if (response.status === 200) {
        alert.show("Se elimino correctamente.");
        window.location.reload(false);
      } else {
        alert.show("Ocurrio un error al eliminar la unidad de negocio.");
      }
    } catch (error) {
      alert.show("Ocurrio un error al eliminar: " + error)
    }
  };

  useEffect(() => {
    getBusinessUnitRequest();
  }, []);

  if (dataExists) {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <ListGroup>
                {resData.map((AllBusinessUnit) => (
                  <Row key={AllBusinessUnit.unidad_Negocio_ID}>
                    <Col xs={8} md={8}>
                      <ListGroup.Item>
                        {AllBusinessUnit.unidad_Negocio_Name}
                      </ListGroup.Item>
                    </Col>
                    <Col xs={4} md={4}>
                      <Link
                        to="/InsertBusinessUnit"
                        state={AllBusinessUnit.unidad_Negocio_ID}
                      >
                        <Button>Modificar</Button>
                      </Link>
                      <Button
                        value={AllBusinessUnit.unidad_Negocio_ID}
                        onClick={(event) =>
                          deleteBusinessUnit(event.target.value)
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
