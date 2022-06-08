import React, { useState, useEffect } from "react";
import { Container, Col, Row, Form, Table, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

export default function BillingByOrder() {
  const API_URL_GET_BILLINGS =
    "http://localhost:4000/Administration/Admin/GetBillings";
  const API_URL_INSERT_USER =
    "http://localhost:4000/Administration/Admin/InsertUser";
  const API_URL_INSERT_USER_ORDER =
    "http://localhost:4000/Administration/Admin/InsertUserOrder";
  const API_URL_MODIFY_ORDER_STATUS =
    "http://localhost:4000/Administration/Admin/ModifyOrderStatePaymnet";

  const [resData, setresData] = useState([]);
  const [isError, setisError] = useState(false);
  const [isUser, setisUser] = useState(true);
  const [totalPrice, settotalPrice] = useState(0);
  const [subTotal, setsubTotal] = useState(0);
  const [IVA, setIVA] = useState(0);
  const [newFirstnameClient, setnewFirstnameClient] = useState("");
  const [newSecondnameClient, setnewSecondnameClient] = useState("");
  const [newFirstLastnameClient, setnewFirstLastnameClient] = useState("");
  const [newSecondLastnameClient, setnewSecondLastnameClient] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const objSelect = location.state;

  const getBillingRequest = async (ID) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_URL_GET_BILLINGS, requestOptions);
    const data = await response.json();
    console.log(data);
    setresData(data);
    var tempTotalPrice = 0;
    data.map(
      (billing) =>
        (tempTotalPrice = tempTotalPrice + parseInt(billing.plato_Bebida_Price * billing.order_Details_Amount))
    );
    let IVACalc = tempTotalPrice*0.13;
    setsubTotal(tempTotalPrice);
    setIVA(IVACalc)
    settotalPrice(tempTotalPrice+IVACalc);
  };

  const paymentRequest = async () => {
    if (!isUser) {
      if (
        newFirstnameClient === "" &&
        newFirstnameClient.trim() === "" &&
        !isNaN(newFirstnameClient)
      ) {
        alert(
          "Por favor no ingrese espacion en blanco o numeros en el nombre."
        );
      } else {
        console.log(!isNaN(newSecondnameClient));
        if (!isNaN(newSecondnameClient)) {
          alert(
            "Por favor no ingrese numeros en el Segundo nombre, u omita ingresarlo."
          );
        } else {
          if (
            newFirstLastnameClient === "" &&
            newFirstLastnameClient.trim() === "" &&
            !isNaN(newFirstLastnameClient)
          ) {
            alert(
              "Por favor no ingrese espacios en blanco o numeros en el primer apellido."
            );
          } else {
            if (
              newSecondLastnameClient === "" &&
              newSecondLastnameClient.trim() === "" &&
              !isNaN(newSecondLastnameClient)
            ) {
              alert(
                "Por favor no ingrese espacios en blanco o numeros en el segundo apellido."
              );
            } else {
              let obj = {
                fK_Tipo_Usuario_Usuario: "3",
                firstName: newFirstnameClient,
                usuario_Second_Name: newSecondnameClient,
                usuario_First_Last_Name: newFirstLastnameClient,
                usuario_Second_Last_Name: newSecondLastnameClient,
                usuario_Password: "",
                usuario_Username: "",
              };

              try {
                const requestOptions = {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(obj),
                };
                const response = await fetch(
                  API_URL_INSERT_USER,
                  requestOptions
                );
                const data = await response.json();
                if (response.status === 200 && data !== 0) {
                  let OrderUser = {
                    FK_Order_Usuario_Order: objSelect,
                    FK_Usuario_Usuario_Order: data,
                  };
                  const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(OrderUser),
                  };
                  const response = await fetch(
                    API_URL_INSERT_USER_ORDER,
                    requestOptions
                  );
                  if (response.status === 200) {
                    const requestOptions = {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(objSelect),
                    };
                    const response = await fetch(
                      API_URL_MODIFY_ORDER_STATUS,
                      requestOptions
                    );
                    if (response.status === 200) {
                      alert("Se realizo el pago.");
                      navigate(-1);
                    } else {
                      alert(
                        "Ocurrio un error al cambiar el estado de la orden"
                      );
                    }
                  } else {
                    alert("Ocurrio un error al asignar la orden al usuario.");
                  }
                } else {
                  alert("Ocurrio un error al ingresar al nuevo usuario.");
                }
              } catch (error) {
                alert("Ocurrio un error: " + error);
              }
            }
          }
        }
      }
    } else {
      let OrderUser = {
        FK_Order_Usuario_Order: objSelect,
        FK_Usuario_Usuario_Order: 2
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(OrderUser),
      };
      const response = await fetch(API_URL_INSERT_USER_ORDER, requestOptions);
      if (response.status === 200) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(objSelect),
        };
        const response = await fetch(
          API_URL_MODIFY_ORDER_STATUS,
          requestOptions
        );
        if (response.status === 200) {
          alert("Se realizo el pago.");
          navigate(-1);
        } else {
          alert("Ocurrio un error al cambiar el estado de la orden");
        }
      } else {
        alert("Ocurrio un error al asignar la orden al usuario.");
      }
    }
  };

  useEffect(() => {
    console.log(objSelect);
    if (objSelect != null) {
      getBillingRequest(objSelect);
    } else {
    }
  }, [objSelect]);

  if (isError) {
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
  } else {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12} xl={12}>
              <Form>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="¿Agregar un usuario?"
                  onClick={(event) => setisUser(!isUser)}
                />
                <Row>
                  <Col xs={12} xl={12}>
                    <Form.Label>
                      Ingrese el primer nombre del cliente
                    </Form.Label>
                    <Form.Control
                      value={newFirstnameClient}
                      onChange={(event) =>
                        setnewFirstnameClient(event.target.value)
                      }
                      placeholder="Primer nombre"
                      disabled={isUser}
                    />
                  </Col>
                  <Col>
                    <Form.Label>*Ingrese el segundo nombre</Form.Label>
                    <Form.Control
                      value={newSecondnameClient}
                      onChange={(event) =>
                        setnewSecondnameClient(event.target.value)
                      }
                      placeholder="Segundo nombre"
                      disabled={isUser}
                    />
                    <Form.Text className="text-muted">*Opcional</Form.Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Ingrese el primer apellido</Form.Label>
                    <Form.Control
                      value={newFirstLastnameClient}
                      onChange={(event) =>
                        setnewFirstLastnameClient(event.target.value)
                      }
                      placeholder="Primer apellido"
                      disabled={isUser}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Ingrese el segundo apellido</Form.Label>
                    <Form.Control
                      value={newSecondLastnameClient}
                      onChange={(event) =>
                        setnewSecondLastnameClient(event.target.value)
                      }
                      placeholder="Segundo apellido"
                      disabled={isUser}
                    />
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col xs={12} xl={12}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Numero de orden</th>
                    <th>Fecha</th>
                    <th>Nombre del platillo</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {resData.map((BillingInformation) => (
                    <tr key={BillingInformation.order_Details_ID}>
                      <td>{BillingInformation.order_ID}</td>
                      <td>{BillingInformation.order_Date}</td>
                      <td>{BillingInformation.plato_Bebida_Name}</td>
                      <td>{BillingInformation.order_Details_Amount}</td>
                      <td>{BillingInformation.plato_Bebida_Price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col xs={12} xl={12}>
              <hr/>
              <div>
                <label>Subtotal: {subTotal}</label><br/>
                <label>IVA: {IVA}</label><br/>
                <label>Descuento: </label><br/>
                <label>Total: {totalPrice}</label><br/>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} xl={12}>
              <Button onClick={paymentRequest}>Pagar</Button>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
