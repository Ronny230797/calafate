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

export default function InsertExtra() {
  const API_URL = "http://localhost:4000/Administration/Admin/InsertExtra";
  const API_URL_Modify = "http://localhost:4000/Administration/Admin/ModifyExtra";
  const API_URL_GET_ByID = "http://localhost:4000/Administration/Admin/GetExtraByID";
  const API_URL_GET_PRODUCT =
    "http://localhost:4000/Administration/Admin/GetAllProduct";

  const [resData, setresData] = useState([]);
  const [newExtraID, setnewExtraID] = useState(0);
  const [newFKProductoExtra, setnewFKProductoExtra] = useState(0);
  const [newExtraName, setnewExtraName] = useState("");
  const [newExtraDescription, setnewExtraDescription] = useState("");
  const [resProductData, setresProductData] = useState([]);
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
      if (response.status === 200) {
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
      if (response.status === 200) {
        alert("Se ingreso correctamente");
        setnewExtraID(0);
        setnewExtraName("");
        setnewExtraDescription("");
        setnewFKProductoExtra(0);
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    }
  };

  const getExtraByIDRequest = async (ID) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_URL_GET_ByID, requestOptions);
    const data = await response.json();
    console.log(data);
    setnewExtraID(data.extra_ID);
    setnewFKProductoExtra(data.fK_Producto_Extra);
    setnewExtraName(data.extra_Name);
    setnewExtraDescription(data.extra_Description);
  };

  const getProductRequest = async () => {
    const response = await fetch(API_URL_GET_PRODUCT);
    const data = await response.json();
    setresProductData(data);
  };

  const InsertEvent = async () => {
    if (isModify) {
      if (newExtraID === 0) {
        alert("No se cargaron los datos correctamente.");
      } else {
        if (newFKProductoExtra === 0) {
          alert("Ingrese el producto al que esta relacionada esta extra.");
        } else {
          if (newExtraName === "") {
            alert("Ingrese el nombre de la extra.");
          } else {
            if (newExtraDescription === "") {
              alert("Ingrese la descripción de la extra.");
            } else {
              let obj = {
                extra_ID: newExtraID,
                fK_Producto_Extra: newFKProductoExtra,
                extra_Name: newExtraName,
                extra_Description: newExtraDescription,
              };
              InsertRequest(obj);
            }
          }
        }
      }
    } else {
      if (newFKProductoExtra === 0) {
        alert("Ingrese el producto al que esta relacionada esta extra.");
      } else {
        if (newExtraName === "") {
          alert("Ingrese el nombre de la extra.");
        } else {
          if (newExtraDescription === "") {
            alert("Ingrese la descripción de la extra.");
          } else {
            let obj = {
              fK_Producto_Extra: newFKProductoExtra,
              extra_Name: newExtraName,
              extra_Description: newExtraDescription,
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
      getExtraByIDRequest(objSelect);
      getProductRequest();
    } else {
      setisModify(false);
      getProductRequest();
    }
  }, [objSelect]);

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
                      setnewFKProductoExtra(event.target.value)
                    }
                    aria-label="fkProductExtra"
                  >
                    <option value={0}>
                      Seleccione el producto relacionado con la extra.
                    </option>
                    {resProductData.map((AllProduct) => (
                      <option
                        key={AllProduct.producto_ID}
                        value={AllProduct.producto_ID}
                      >
                        {AllProduct.producto_Name}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      Nombre de la extra a ingresar.
                    </InputGroup.Text>
                    <FormControl
                      aria-label="extraName"
                      value={newExtraName}
                      type="text"
                      onChange={(event) => setnewExtraName(event.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Descripción de la extra.</InputGroup.Text>
                    <FormControl
                      aria-label="extraDescription"
                      value={newExtraDescription}
                      type="text"
                      onChange={(event) =>
                        setnewExtraDescription(event.target.value)
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
