import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function AllDishes() {
  const API_URL_GET_Dish = "http://localhost:4000/waiter/Dishes/GetAllDishes";
  const [resData, setresData] = useState([]);
  const [objSelect, setObjSelect] = useState([]);

  const getDishRequest = async () => {
    const response = await fetch(API_URL_GET_Dish);
    const data = await response.json();
    setresData(data);
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
                    <ListGroup.Item key={Alldishes.platoID}>{Alldishes.plato_Bebida_Nombre}<Link to='/InsertDish' state= {Alldishes.platoID} ><Button>Modificar</Button></Link></ListGroup.Item>
                ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
