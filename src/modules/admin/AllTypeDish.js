import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AllTypeDish() {
  const API_URL_GET_TYPE_Dish =
    "http://localhost:4000/Administration/Admin/GetAllTypeDishDrink";
  const API_URL_DELETE_TYPE_Dish =
    "http://localhost:4000/Administration/Admin/DeleteTypeDishDrink";
  const [resData, setresData] = useState([]);
  const [objSelect, setObjSelect] = useState([]);
  const [dataExists, setdataExists] = useState(true);

  const getTypeDishRequest = async () => {
    try {
      const response = await fetch(API_URL_GET_TYPE_Dish);
      const data = await response.json();
      setresData(data);
    } catch (err) {
      alert("Ocurrio un error al cargar los datos... " + err);
      setdataExists(false);
    }
  };

  const deleteTypeDish = async (ID) => {
    try {
      console.log(ID);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ID),
      };
      const response = await fetch(API_URL_DELETE_TYPE_Dish, requestOptions);
      if (response.status === 200) {
        alert("Se elimino correctamente.");
        window.location.reload();
      } else {
        alert("Ocurrio un error al eliminar el tipo de platillo.");
      }
    } catch (error) {
      alert("Ocurrio un error al eliminar: " + error);
    }
  };

  useEffect(() => {
    getTypeDishRequest();
  }, []);

  if (dataExists) {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <ListGroup>
                {resData.map((AllTypedishes) => (
                  <Row key={AllTypedishes.tipo_Plato_Bebida_ID}>
                    <Col xs={8} md={8}>
                      <ListGroup.Item>
                        {AllTypedishes.tipo_Plato_Bebida_Name}
                      </ListGroup.Item>
                    </Col>
                    <Col xs={4} md={4}>
                      <Link
                        to="/InsertTypeDish"
                        state={AllTypedishes.tipo_Plato_Bebida_ID}
                      >
                        <Button>Modificar</Button>
                      </Link>
                      <Button
                        value={AllTypedishes.tipo_Plato_Bebida_ID}
                        onClick={(event) => deleteTypeDish(event.target.value)}
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
