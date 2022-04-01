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
  const API_URL_DELETE_Dish = "http://localhost:4000/Administration/Admin/DeleteDish";
  const [resData, setresData] = useState([]);
  const [objSelect, setObjSelect] = useState([]);

  const getDishRequest = async () => {
    const response = await fetch(API_URL_GET_Dish);
    const data = await response.json();
    setresData(data);
  };

  const deleteDish = async (ID) => {
    console.log(ID)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_URL_DELETE_Dish, requestOptions);
    const data = await response.json();
  };

  useEffect(() => {
    getDishRequest();
  }, []);

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
                    <Button value={Alldishes.platoID} onClick={(event) => deleteDish(event.target.value)}>Eliminar</Button>
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
