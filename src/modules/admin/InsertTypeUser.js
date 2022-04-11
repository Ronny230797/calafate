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

export default function InsertDish(props) {
  const API_URL = "http://localhost:4000/Administration/Admin/InsertUserType";
  const API_URL_Modify =
    "http://localhost:4000/Administration/Admin/ModifyUserType";
  const API_URL_GET_ByID =
    "http://localhost:4000/Administration/Admin/GetUserTypeByID";

  const [resData, setresData] = useState([]);
  const [userTypeID, setuserTypeID] = useState(0);
  const [userTypeName, setuserTypeName] = useState("");
  const [userTypeDescription, setuserTypeDescription] = useState("");
  const [isModify, setisModify] = useState(false);
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
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    } else {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      setresData(data);
      console.log(data.status);
      if (data.status == 200) {
        alert("Se ingreso correctamente");
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    }
  };

  const getUserTypeByIDRequest = async (ID) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_URL_GET_ByID, requestOptions);
    const data = await response.json();
    setuserTypeID(data.tipo_Usuario_ID);
    setuserTypeName(data.tipo_Usuario_Name);
    setuserTypeDescription(data.tipo_Usuario_Description);
  };

  const InsertEvent = async () => {
    if (isModify) {
      if (userTypeName === "") {
        alert("Ingrese el nombre, por favor");
      } else {
        if (userTypeDescription === "") {
          alert("Ingrese la descripción, por favor.");
        } else {
          if (userTypeID === 0) {
            alert("No se cargaron los datos correctamente.");
          } else {
            let obj = {
              Tipo_Usuario_ID: userTypeID,
              Tipo_Usuario_Name: userTypeName,
              Tipo_Usuario_Description: userTypeDescription,
            };
            InsertRequest(obj);
          }
        }
      }
    } else {
      if (userTypeName === "") {
        alert("Ingrese el nombre, por favor");
      } else {
        if (userTypeDescription === "") {
          alert("Ingrese la descripción, por favor.");
        } else {
          let obj = {
            Tipo_Usuario_Name: userTypeName,
            Tipo_Usuario_Description: userTypeDescription,
          };
          InsertRequest(obj);
        }
      }
    }
  };

  useEffect(() => {
    if (objSelect != null) {
      setisModify(true);
      getUserTypeByIDRequest(objSelect);
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
                    <InputGroup.Text>Nombre del tipo usuario</InputGroup.Text>
                    <FormControl
                      aria-label="userType"
                      value={userTypeName}
                      type="text"
                      onChange={(event) => setuserTypeName(event.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      Descripcion del tipo de usuario
                    </InputGroup.Text>
                    <FormControl
                      aria-label="userTypeDescription"
                      value={userTypeDescription}
                      type="text"
                      onChange={(event) =>
                        setuserTypeDescription(event.target.value)
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
