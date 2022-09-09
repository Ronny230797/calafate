import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Button,
  ListGroup,
  FormControl,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import AppBarLogged from '../../components/appbar-logged.js';
import { useAlert } from "react-alert";
export default function NewOrder() {
  const API_URL_INSERT_OD =
    "http://localhost:4000/Administration/Admin/InsertOrder_Details";
  const API_URL_Modify =
    "http://localhost:4000/Administration/Admin/ModifyOrder_Details";
  const API_GET = "http://localhost:4000/waiter/Dishes/GetAllDishes";
  const API_GET_BY_ID_ORDER_DETAILS =
    "http://localhost:4000/Administration/Admin/GetOrder_DetailsByOrderID";
  const API_DELETE_ORDER_DETAILS =
    "http://localhost:4000/Administration/Admin/DeleteOrder_Details";
  const [resDishesData, setresDishesData] = useState([]);
  const [postDataOrderDetails, setpostDataOrderDetails] = useState([]);
  const [isError, setisError] = useState(false);
  const alert = useAlert();
  const [newNumberTable, setnewNumberTable] = useState(0);
  const [newOrderDescription, setnewOrderDescription] = useState("");
  const [newOrderDate, setnewOrderDate] = useState(new Date());
  const [newOrderID, setnewOrderID] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const objSelect = location.state;

  const getAllDishesRequest = async () => {
    try {
      const response = await fetch(API_GET);
      const data = await response.json();
      setresDishesData(data);
    } catch (err) {
      alert.show("Ocurrio un error al cargar los datos... " + err);
    }
  };

  const getOrderDetailsByIDRequest = async (ID) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_GET_BY_ID_ORDER_DETAILS, requestOptions);
    const data = await response.json();
    setpostDataOrderDetails(data);
  };

  const handleAddDish = async (obj) => {
    var myID = parseInt(obj);
    const resultado = resDishesData.find((element) => element.platoID === myID);
    const alreadyExists = postDataOrderDetails.find(
      (element) => element.fK_Plato_Bebida_Order_Details === resultado.platoID
    );


    if (alreadyExists === undefined) {
      let newOrder = {
          order_Details_ID: 0,
          fK_Order_Order_Details: objSelect,
          fK_Plato_Bebida_Order_Details: resultado.platoID,
          fK_Plato_Bebida_Order_Details_Name: resultado.plato_Bebida_Nombre,
          order_Details_Amount: 1,
          order_Details_Description: "Mesa: " + newNumberTable + " - Fecha: " + newOrderDate.toLocaleString("es-CR", { timeZone: "America/Costa_Rica",}),
          order_Details_Date: newOrderDate,
        };
      setpostDataOrderDetails([...postDataOrderDetails, newOrder])
    } else {
      alert.show("Ya se agrego este platillo, modifica la cantidad.");
    }
  };

  const handleDeleteDish = async (obj) => {
    try {
      var myID = parseInt(obj);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(myID),
      };
      const response = await fetch(API_DELETE_ORDER_DETAILS, requestOptions);
      if (response.status === 200) {
        alert.show("Se elimino correctamente.");
        window.location.reload(false);
      } else {
        alert.show("Ocurrio un error al borrar el detalle de compra... ");
      }
    } catch (err) {
      alert.show("Ocurrio un error al cargar los datos... " + err);
    }
  };

  const handleUpdateDish = async (ID, NewAmount) => {
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

  const fetchModifyOrderDetails = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({postDataOrderDetails}),
      };


      const response = await axios.post(API_URL_Modify, postDataOrderDetails);
      /*const response = await fetch(API_URL_Modify, requestOptions);*/

      if(response.status === 200) {
        alert.show("Se modificaron los detalles de la orden.");
        navigate(-1);
      }else {
        alert(
          "Ocurrio un error al intentar modificar los platillos de la orden."
        );
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if (objSelect != null) {
      getOrderDetailsByIDRequest(objSelect);
      getAllDishesRequest();
    } else {
      setisError(true);
    }
  }, []);

  if (isError) {
    return (
      <React.Fragment>
        <Container>
        <AppBarLogged />
          <Row>
            <Col>
              <h1>Ocurrio un error al cargar los detalles de la orden.</h1>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Container>
        <AppBarLogged />
          <Row>
            <Col xs={10} md={6}>
               <h2>Añadir</h2>
              <ListGroup>
                {resDishesData.map((AllDishes) => (
                  <Row key={AllDishes.platoID}>
                    <Col xs={10} md={8}>
                      <ListGroup.Item>
                        {AllDishes.plato_Bebida_Nombre}
                      </ListGroup.Item>
                    </Col>
                    <Col xs={2} md={4}>
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


            <Col xs={10} md={6}>
            <h2>Orden Actual</h2>
              <ListGroup>
                {postDataOrderDetails.map((AllDishesToPost) => (
                  <Row key={AllDishesToPost.order_Details_ID}>
                    <Col xs={6} md={6}>
                      <ListGroup.Item>
                        {AllDishesToPost.fK_Plato_Bebida_Order_Details_Name}
                      </ListGroup.Item>
                    </Col>
                    <Col xs={3} md={2}>
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
                    <Col xs={3} md={4}>
                      <Button
                        onClick={(event) =>
                          handleDeleteDish(AllDishesToPost.order_Details_ID)
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
            <Col>
            <Button onClick={fetchModifyOrderDetails}>Modificar orden</Button>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
