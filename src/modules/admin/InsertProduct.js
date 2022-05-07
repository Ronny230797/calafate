import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

export default function InsertProduct() {
  const API_URL = "http://localhost:4000/Administration/Admin/InsertProduct";
  const API_URL_Modify = "http://localhost:4000/Administration/Admin/ModifyProduct";
  const API_URL_GET_ByID = "http://localhost:4000/Administration/Admin/GetProductByID";

  const [resData, setresData] = useState([]);
  const [newProductID, setnewProductID] = useState(0);
  const [newProductName, setnewProductName] = useState("");
  const [newProductDescription, setnewProductDescription] = useState("");
  const [newProductAmount, setnewProductAmount] = useState(0);
  const [isModify, setisModify] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const objSelect = location.state;

  const InsertRequest = async (obj) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    if (isModify) {
      const response = await fetch(API_URL_Modify, requestOptions);
      const data = await response.json();
      setresData(data);
      if (response.status == 200) {
        alert("Se ingreso correctamente");
        navigate(-1);
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    } else {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      setresData(data);
      console.log(data.status);
      if (response.status == 200) {
        alert("Se ingreso correctamente");
        setnewProductID(0);
        setnewProductName("");
        setnewProductDescription("");
        setnewProductAmount(0);
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    }
  };

  const getProductByIDRequest = async (ID) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_URL_GET_ByID, requestOptions);
    const data = await response.json();
    console.log(data);
    setnewProductID(data.producto_ID);
    setnewProductName(data.producto_Name);
    setnewProductDescription(data.producto_Description);
    setnewProductAmount(data.producto_Amount);
  };

  const InsertEvent = async () => {
    if (isModify) {
      if (newProductID === 0) {
        alert("No se cargaron los datos correctamente.");
      } else {
        if (newProductName === "") {
          alert("Ingrese el nombre del producto por favor.");
        } else {
          if (newProductDescription === "") {
            alert("Ingrese una descripción del producto por favor.");
          } else {
            if (newProductAmount === 0) {
              alert("Ingrese la cantidad de producto.");
            } else {
              let obj = {
                producto_ID: newProductID,
                producto_Name: newProductName,
                producto_Description: newProductDescription,
                producto_Amount: newProductAmount,
              };
              InsertRequest(obj);
            }
          }
        }
      }
    } else {
      if (newProductName === "") {
        alert("Ingrese el nombre del producto por favor.");
      } else {
        if (newProductDescription === "") {
          alert("Ingrese una descripción del producto por favor.");
        } else {
          if (newProductAmount === 0) {
            alert("Ingrese la cantidad de producto.");
          } else {
            let obj = {
              producto_Name: newProductName,
              producto_Description: newProductDescription,
              producto_Amount: newProductAmount,
            };
            InsertRequest(obj);
          }
        }
      }
    }
  };

  useEffect(() => {
    console.log(objSelect);
    if (objSelect != null) {
      setisModify(true);
      getProductByIDRequest(objSelect);
    } else {
      setisModify(false);
    }
  }, []);

  return (
    <React.Fragment>
      <Container className="InsertDish">
        <Row>
          <Col xs={12} md={12}>
            <div className="InsertDish-card">
              <Row>
                <Col xs={10} md={10}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Nombre del producto</InputGroup.Text>
                    <FormControl
                      aria-label="productName"
                      value={newProductName}
                      type="text"
                      onChange={(event) =>
                        setnewProductName(event.target.value)
                      }
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Descripción del producto</InputGroup.Text>
                    <FormControl
                      aria-label="productDescription"
                      value={newProductDescription}
                      type="text"
                      onChange={(event) =>
                        setnewProductDescription(event.target.value)
                      }
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      Cantidad de producto a ingresar
                    </InputGroup.Text>
                    <FormControl
                      aria-label="productAmount"
                      value={newProductAmount}
                      type="text"
                      onChange={(event) =>
                        setnewProductAmount(event.target.value)
                      }
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Button onClick={InsertEvent}>
                {isModify ? "Modificar" : "Ingresar"}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
