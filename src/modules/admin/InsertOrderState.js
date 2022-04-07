import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  FormSelect,
} from "react-bootstrap";
import "../../styles/admin/InsertDish.scss";
import DatePicker from "react-date-picker";

export default function InsertOrderState(props) {
  const API_URL_Modify_ORDER_STATE =
    "http://localhost:4000/Administration/Admin/ModifyOrderState";
  const API_URL_GET_ORDER =
    "http://localhost:4000/Administration/Admin/GetAllOrder";
  const API_URL_GET_STATE =
    "http://localhost:4000/Administration/Admin/GetAllState";
  const API_URL_GET_ByID =
    "http://localhost:4000/Administration/Admin/GetOrderStateByID";

  const [resOrderData, setresOrderData] = useState([]);
  const [resStateData, setresStateData] = useState([]);
  const [newOrderstateID, setnewOrderstateID] = useState(0);
  const [newOrderOrderState, setnewOrderOrderState] = useState(0);
  const [newStateOrderState, setnewStateOrderState] = useState(0);
  const [newOrderStateDate, setnewOrderStateDate] = useState(new Date());
  const [newOrderStateDescription, setnewOrderStateDescription] = useState("");
  const location = useLocation();
  const objSelect = location.state;

  const InsertRequest = async (obj) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    const response = await fetch(API_URL_Modify_ORDER_STATE, requestOptions);
    if (response.status == 200) {
      alert("Se ingreso correctamente");
    } else {
      alert("Ocurrio un error: " + response.status);
    }
  };

  const getOrderRequest = async () => {
    const response = await fetch(API_URL_GET_ORDER);
    const data = await response.json();
    setresOrderData(data);
  };

  const getStateRequest = async () => {
    const response = await fetch(API_URL_GET_STATE);
    const data = await response.json();
    setresStateData(data);
  };

  const getOrderStateByIDRequest = async (ID) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_URL_GET_ByID, requestOptions);
    const data = await response.json();
    console.log(data);
    setnewOrderstateID(data.order_Estado_ID);
    setnewOrderOrderState(data.fK_Order_Order_Estado);
    setnewStateOrderState(data.fK_Estado_Order_Estado);
    setnewOrderStateDate(data.order_Estado_Date);
    setnewOrderStateDescription(data.Order_Estado_Description);
  };

  const InsertEvent = async () => {
    if (newOrderstateID === 0) {
      alert("Ocurrio un error al cargar los datos.");
    } else {
      if (newOrderOrderState === 0) {
        alert("No se ingreso la orden que desea modificar.");
      } else {
        if (newStateOrderState === 0) {
          alert("No se ingreso el estado a modificar.");
        } else {
          if (newOrderStateDescription === "") {
            alert("Ingrese una descripción");
          } else {
            let obj = {
              order_Estado_ID: newOrderstateID,
              fK_Order_Order_Estado: newOrderOrderState,
              fK_Estado_Order_Estado: newStateOrderState,
              order_Estado_Date: newOrderStateDate,
              order_Estado_Description: newOrderStateDescription,
            };
            InsertRequest(obj);
          }
        }
      }
    }
  };

  useEffect(() => {
    getOrderRequest();
    getStateRequest();
    getOrderStateByIDRequest(objSelect);
  }, []);

  return (
    <React.Fragment>
      <Container className="InsertDish">
        <Row>
          <Col xs={12} md={12}>
            <div className="InsertDish-card">
              <Row>
                <Col xs={10} md={10}>
                  <FormSelect
                    onChange={(event) =>
                      setnewOrderOrderState(event.target.value)
                    }
                    aria-label="OrderOrderState"
                  >
                    <option value={0}>Seleccione la orden.</option>
                    {resOrderData.map((AllOrder) => (
                      <option key={AllOrder.order_ID} value={AllOrder.order_ID}>
                        {AllOrder.order_Description}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <FormSelect
                    onChange={(event) =>
                      setnewStateOrderState(event.target.value)
                    }
                    aria-label="StateOrderState"
                  >
                    <option value={0}>Seleccione el estado de la orden.</option>
                    {resStateData.map((AllState) => (
                      <option
                        key={AllState.Estado_ID}
                        value={AllState.Estado_ID}
                      >
                        {AllState.estado_Name}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <DatePicker
                    onChange={setnewOrderStateDate}
                    value={newOrderStateDate}
                  >
                    Seleccione la fecha.
                  </DatePicker>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      Descripcion del estado de la orden.
                    </InputGroup.Text>
                    <FormControl
                      aria-label="TipoPlatoDescripción"
                      value={newOrderStateDescription}
                      type="text"
                      onChange={(event) =>
                        setnewOrderStateDescription(event.target.value)
                      }
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Button onClick={InsertEvent}>Modificar</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
