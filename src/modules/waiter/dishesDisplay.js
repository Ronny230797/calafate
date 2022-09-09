import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  ListGroup,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import AppBarLogged from '../../components/appbar-logged.js';
import { useAlert } from "react-alert";
export default function DishesDisplay() {
  const navigate = useNavigate();
  const location = useLocation();
  let idMesa = location.state;
  const API_GET = "http://localhost:4000/waiter/Dishes/GetAllDishes";
  const API_URL_INSERT_OD =
    "http://localhost:4000/waiter/Dishes/InsertOrderDetails";
  const [resDishesData, setresDishesData] = useState([]);
  const [postDataOrderDetails, setpostDataOrderDetails] = useState([]);
  const [dataExists, setdataExists] = useState(true);
  const [newNumberTable, setnewNumberTable] = useState(idMesa);
  const [newOrderDescription, setnewOrderDescription] = useState("");
  const [newOrderDate, setnewOrderDate] = useState(new Date());
  const alert = useAlert();

  const getAllDishesRequest = async () => {
    try {
      const response = await fetch(API_GET);
      const data = await response.json();
      setresDishesData(data);
    } catch (err) {
      alert.show("Ocurrio un error al cargar los datos... " + err);
      setdataExists(false);
    }
  };

  const handleAddDish = (obj) => {
    var myID = parseInt(obj);
    const resultado = resDishesData.find((element) => element.platoID === myID);
    const alreadyExists = postDataOrderDetails.find(
      (element) => element.fK_Plato_Bebida_Order_Details === resultado.platoID
    );
    if (alreadyExists === undefined) {
      let newOrder = {
        fK_Order_Order_Details: 0,
        fK_Plato_Bebida_Order_Details: resultado.platoID,
        fK_Plato_Bebida_Order_Details_Name: resultado.plato_Bebida_Nombre,
        order_Details_Amount: 1,
        order_Details_Description:
          "Mesa: " +
          newNumberTable +
          " - Fecha: " +
          newOrderDate.toLocaleString("es-CR", {
            timeZone: "America/Costa_Rica",
          }),
        order_Details_Date: newOrderDate,
      };
      setpostDataOrderDetails([...postDataOrderDetails, newOrder]);
    } else {
      alert.show("Ya se agrego este platillo, modifica la cantidad.");
    }
  };

  const handleDeleteDish = (obj) => {
    var myID = parseInt(obj);
    const resultado = postDataOrderDetails.filter(
      (element) => element.fK_Plato_Bebida_Order_Details !== myID
    );
    if (resultado.length > 0) {
      setpostDataOrderDetails(resultado);
    } else {
      setpostDataOrderDetails([]);
    }
  };

  const handleUpdateDish = (ID, NewAmount) => {
    var myID = parseInt(ID);
    const updateDish = postDataOrderDetails.map((uploadData) => {
      if (uploadData.fK_Plato_Bebida_Order_Details === myID) {
        return {
          ...uploadData,
          order_Details_Amount: NewAmount,
        };
      }
      return uploadData;
    });
    setpostDataOrderDetails(updateDish);
  };

  const InsertOrderDetailsEvent = async () => {
    let dataObj = {
      Numero_Mesa: newNumberTable,
      ListOrderDetails: postDataOrderDetails
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataObj),
    };
    const response = await fetch(API_URL_INSERT_OD, requestOptions);
    if (response.status === 200) {
      alert.show("Se agregaron los detalles de la orden.");
      setpostDataOrderDetails([]);
      setnewNumberTable(0);
      navigate(-1);
    } else {
      alert.show("Ocurrio un error: " + response.status);
    }
  };

  useEffect(() => {
    getAllDishesRequest();
  }, []);

  if (dataExists) {
    return (
      <React.Fragment>
        <Container>
          <AppBarLogged />
          <Row>
            <Col xs={4} xl={4}>
              <div>
                <InputGroup>
                  <InputGroup.Text>Numero de mesa</InputGroup.Text>
                  <FormControl
                    placeholder="Numero de mesa"
                    aria-label="TableNumber"
                    defaultValue={idMesa}
                    values={newNumberTable}
                    disabled={true}
                    onChange={(event) =>
                      setnewNumberTable(event.target.value)}
                  />
                </InputGroup>
              </div>
            </Col>
          </Row>
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
                  <Row key={AllDishesToPost.fK_Plato_Bebida_Order_Details}>
                    <Col xs={6} xl={6}>
                      <ListGroup.Item>
                        {AllDishesToPost.fK_Plato_Bebida_Order_Details_Name}
                      </ListGroup.Item>
                    </Col>
                    <Col xs={2} xl={2}>
                      <FormControl
                        size="lg"
                        type="text"
                        placeholder="Cantidad"
                        value={AllDishesToPost.order_Details_Amount}
                        onChange={(event) =>
                          handleUpdateDish(
                            AllDishesToPost.fK_Plato_Bebida_Order_Details,
                            event.target.value
                          )
                        }
                      />
                    </Col>
                    <Col xs={4} xl={4}>
                      <Button
                        onClick={(event) =>
                          handleDeleteDish(
                            AllDishesToPost.fK_Plato_Bebida_Order_Details
                          )
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
          <Row>
            <Col xs={12} xl={12}>
              <Button onClick={InsertOrderDetailsEvent}>
                Agregar detalles de la orden.
              </Button>
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
