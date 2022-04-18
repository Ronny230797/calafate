import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  ListGroup,
  Button,
  FormControl,
} from "react-bootstrap";

export default function DishesDisplay() {
  const API_GET = "http://localhost:4000/waiter/Dishes/GetAllDishes";
  const [resDishesData, setresDishesData] = useState([]);
  const [postDataOrderDetails, setpostDataOrderDetails] = useState([]);
  const [dataExists, setdataExists] = useState(true);

  const getAllDishesRequest = async () => {
    try {
      const response = await fetch(API_GET);
      const data = await response.json();
      setresDishesData(data);
    } catch (err) {
      alert("Ocurrio un error al cargar los datos... " + err);
      setdataExists(false);
    }
  };

  const handleAddDish = (obj) => {
    console.log(obj);
    var myID = parseInt(obj);
    const resultado = resDishesData.find((element) => element.platoID === myID);
    setpostDataOrderDetails([...postDataOrderDetails, resultado]);
  };

  const handleDeleteDish = (obj) => {
    console.log(obj);
    var myID = parseInt(obj);
    const resultado = postDataOrderDetails.filter(
      (element) => element.platoID !== myID
    );
    console.log({ resultado });
    if(resultado.length > 0){
      setpostDataOrderDetails(resultado);
    }else {
      setpostDataOrderDetails([]);
    }
    
  };

  useEffect(() => {
    getAllDishesRequest();
  }, []);
  if (dataExists) {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={6} xl={6}>
              <ListGroup>
                {resDishesData.map((AllDishes) => (
                  <Row key={AllDishes.platoID}>
                    <Col xs={6} xl={6}>
                      <ListGroup.Item>
                        {AllDishes.plato_Bebida_Nombre}
                      </ListGroup.Item>
                    </Col>
                    <Col xs={2} xl={2}></Col>
                    <Col xs={4} xl={4}>
                      <Button
                        onClick={(event) => handleAddDish(event.target.value)}
                        value={AllDishes.platoID}
                      >
                        Agregar
                      </Button>
                    </Col>
                  </Row>
                ))}
              </ListGroup>
            </Col>
            <Col xs={6} xl={6}>
              <ListGroup>
                {postDataOrderDetails.map((AllDishesToPost) => (
                  <Row key={AllDishesToPost.platoID}>
                    <Col xs={6} xl={6}>
                      <ListGroup.Item>
                        {AllDishesToPost.plato_Bebida_Nombre}
                      </ListGroup.Item>
                    </Col>
                    <Col xs={2} xl={2}></Col>
                    <Col xs={4} xl={4}>
                      <Button
                        onClick={(event) =>
                          handleDeleteDish(AllDishesToPost.platoID)
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
