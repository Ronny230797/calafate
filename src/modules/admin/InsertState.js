import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

export default function InsertState() {
  const API_URL_INSERT_STATE =
    "http://localhost:4000/Administration/Admin/InsertState";
  const API_URL_Modify_STATE =
    "http://localhost:4000/Administration/Admin/ModifyState";
  const API_URL_GET_ByID =
    "http://localhost:4000/Administration/Admin/GetStateByID";

  const [newStateName, setnewStateName] = useState("");
  const [newStateID, setnewStateID] = useState(0);
  const [newStateDescription, setnewStateDescription] = useState("");
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
      const response = await fetch(API_URL_Modify_STATE, requestOptions);
      if (response.status == 200) {
        alert("Se ingreso correctamente");
        navigate(-1);
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    } else {
      const response = await fetch(API_URL_INSERT_STATE, requestOptions);
      if (response.status == 200) {
        alert("Se ingreso correctamente");
        setnewStateID(0);
        setnewStateDescription("");
        setnewStateName("");
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    }
  };

  const getStateByIDRequest = async (ID) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_URL_GET_ByID, requestOptions);
    const data = await response.json();
    console.log(data);
    setnewStateID(data.estado_ID);
    setnewStateName(data.estado_Name);
    setnewStateDescription(data.estado_Description);
  };

  const InsertEvent = async () => {
    if (isModify) {
      if (newStateName == "") {
        alert("Por favor ingrese el nombre");
      } else {
        if (newStateID == 0) {
          alert("Ocurrio un error al cargar los datos...");
        } else {
          if (newStateDescription == "") {
            alert("Por favor ingrese la descripción...");
          } else {
            let obj = {
              estado_ID: newStateID,
              estado_Name: newStateName,
              estado_Description: newStateDescription,
            };
            InsertRequest(obj);
          }
        }
      }
    } else {
      if (newStateName == "") {
        alert("Por favor ingrese el nombre");
      } else {
        if (newStateDescription == "") {
          alert("Por favor ingrese la descripción...");
        } else {
          let obj = {
            estado_Name: newStateName,
            estado_Description: newStateDescription,
          };
          InsertRequest(obj);
        }
      }
    }
  };

  useEffect(() => {
    if (objSelect != null) {
      setisModify(true);
      getStateByIDRequest(objSelect);
    } else {
      setisModify(false);
    }
  }, []);

  return (
    <Container className="InsertDish">
      <Row>
        <Col xs={12} md={12}>
          <div className="InsertDish-card">
            <Row>
              <Col xs={10} md={10}>
                <InputGroup className="mb-3">
                  <InputGroup.Text>
                    Nombre del nuevo estado.
                  </InputGroup.Text>
                  <FormControl
                    aria-label="TipoPlatillo/BebidaNombre"
                    value={newStateName}
                    type="text"
                    onChange={(event) => setnewStateName(event.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={10} md={10}>
                <InputGroup className="mb-3">
                  <InputGroup.Text>
                    Descripcion del estado.
                  </InputGroup.Text>
                  <FormControl
                    aria-label="TipoPlatoDescripción"
                    value={newStateDescription}
                    type="text"
                    onChange={(event) =>
                      setnewStateDescription(event.target.value)
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
  );
}
