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
  const API_URL_GET_Dish = "http://localhost:4000/waiter/Dishes/GetAllDishes";
  const API_URL_DELETE_Dish =
    "http://localhost:4000/Administration/Admin/DeleteDish";
  const [resData, setresData] = useState([]);
  const [dataExists, setdataExists] = useState(true);

  const getDishRequest = async () => {
    try {
      const response = await fetch(API_URL_GET_Dish);
      const data = await response.json();
      setresData(data);
    } catch (err) {
      setdataExists(false);
      alert("Ocurrio un error al cargar los datos... " + err);
    }
  };

  const deleteDish = async (ID) => {
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
    getDishRequest();
  }, []);

  if (dataExists) {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <ListGroup>
                {resData.map((Alldishes) => (
                  <Row key={Alldishes.platoID}>
                    <Col xs={8} md={8}>
                      <ListGroup.Item>
                        {Alldishes.plato_Bebida_Nombre}
                      </ListGroup.Item>
                    </Col>
                    <Col xs={4} md={4}>
                      <Link to="/InsertDish" state={Alldishes.platoID}>
                        <Button>Modificar</Button>
                      </Link>
                      <Button
                        value={Alldishes.platoID}
                        onClick={(event) => deleteDish(event.target.value)}
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
