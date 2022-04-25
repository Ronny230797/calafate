import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  ListGroup,
  Button,
  FormControl,
  Form,
} from "react-bootstrap";

export default function DishesDisplay() {
  const API_GET = "http://localhost:4000/waiter/Dishes/GetAllDishes";
  const API_URL = "http://localhost:4000/Administration/Admin/InsertOrder";
  const API_URL_Modify =
    "http://localhost:4000/Administration/Admin/ModifyOrder";
  const API_URL_INSERT_OD =
    'http://localhost:4000/Administration/Admin/InsertOrder_Details';
  const [resDishesData, setresDishesData] = useState([]);
  const [postDataOrderDetails, setpostDataOrderDetails] = useState([]);
  const [dataExists, setdataExists] = useState(true);
  const [isOrderCreated, setisOrderCreated] = useState(false);
  const [newNumberTable, setnewNumberTable] = useState(0);
  const [newOrderDescription, setnewOrderDescription] = useState("");
  const [newOrderDate, setnewOrderDate] = useState(new Date());
  const [newOrderID, setnewOrderID] = useState(0);
  const [isModify, setisModify] = useState(false);

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
    var myID = parseInt(obj);
    const resultado = resDishesData.find((element) => element.platoID === myID);
    const alreadyExists = postDataOrderDetails.find(
      (element) => element.fK_Plato_Bebida_Order_Details === resultado.platoID
    );
    if (alreadyExists === undefined) {
      let newOrder = {
        fK_Order_Order_Details: newOrderID,
        fK_Plato_Bebida_Order_Details: resultado.platoID,
        plato_Bebida_Nombre: resultado.plato_Bebida_Nombre,
        order_Details_Amount: 1,
        order_Details_Description: "Mesa: " + newNumberTable + " - Fecha: " + newOrderDate,
        order_Details_Date: newOrderDate,
      };
      setpostDataOrderDetails([...postDataOrderDetails, newOrder]);
    } else {
      alert("Ya se agrego este platillo, modifica la cantidad.");
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
    console.log({postDataOrderDetails})
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postDataOrderDetails)
    };
    console.log(requestOptions)
    const response = await fetch(API_URL_INSERT_OD, requestOptions);
    if (response.status === 200) {
      alert("Se agregaron los detalles de la orden.");
      setisModify(false);
      setisOrderCreated(false);
      setpostDataOrderDetails([]);
      setnewNumberTable(0);
      setnewOrderID(0);
    } else {
      alert("Ocurrio un error: " + response.status);
    }
  };

  const InsertOrderEvent = async () => {
    if (isModify) {
      if (newOrderID === 0) {
        alert(
          "No se cargaron los datos de forma adecuada, falta el identificador de la orden."
        );
      } else {
        if (!isNaN(newNumberTable)) {
          alert("No ingrese letras en el numero de mesa.");
        } else {
          var descriptionOrderDetails =
            "Mesa: " + newNumberTable + " - Fecha: " + newOrderDate;
          setnewOrderDescription(descriptionOrderDetails);
          let obj = {
            Order_ID: newOrderID,
            Order_Date: newOrderDate,
            Numero_Mesa: newNumberTable,
            Order_Description: "Mesa: " + newNumberTable + " - Fecha: " + newOrderDate,
          };
          handleInsertNewOrder(obj);
        }
      }
    } else {
      if (isNaN(newNumberTable)) {
        alert("No ingrese letras en el numero de mesa.");
      } else {
        setnewOrderDescription("Mesa: " + newNumberTable + " - Fecha: " + newOrderDate);
        console.log(newOrderDescription)
        let obj = {
          Order_Date: newOrderDate,
          Numero_Mesa: newNumberTable,
          Order_Description: "Mesa: " + newNumberTable + " - Fecha: " + newOrderDate,
        };
        handleInsertNewOrder(obj);
      }
    }
  };

  const handleInsertNewOrder = async (obj) => {
    console.log(obj)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    if (isModify) {
      const response = await fetch(API_URL_Modify, requestOptions);
      const data = await response.json();
      setnewOrderID(data);
      if (response.status === 200) {
        alert("Se Modifico correctamente");
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    } else {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      setnewOrderID(data);
      if (response.status === 200) {
        alert("Se ingreso la orden correctamente");
        setisOrderCreated(true);
        setisModify(true);
        setnewOrderDescription("");
      } else {
        alert("Ocurrio un error: " + response.status);
      }
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
            <Col xs={4} xl={4}>
              <label>Numero de orden: {newOrderID}</label>
              <Form.Group className="mb-3" controlId="formBasicNumberTable">
                <Form.Label>Numero de mesa</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el numero de la mesa."
                  value={newNumberTable}
                  onChange={(event) => setnewNumberTable(event.target.value)}
                />
              </Form.Group>
              <Button onClick={InsertOrderEvent}>
                {isOrderCreated ? "Modificar orden" : "Crear orden"}
              </Button>
            </Col>
          </Row>
          <br />
          {!isOrderCreated ? (
            <Form.Label>
              Ingresa una nueva orden con el numero de mesa.
            </Form.Label>
          ) : (
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
                          {AllDishesToPost.plato_Bebida_Nombre}
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
              <Button onClick={InsertOrderDetailsEvent}>
                Agregar detalles de la orden.
              </Button>
            </Row>
          )}
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
