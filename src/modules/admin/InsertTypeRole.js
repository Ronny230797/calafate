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

export default function InsertTypeRole() {
  const API_URL_INSERT_TYPE_ROLE =
    "http://localhost:4000/Administration/Admin/InsertTypeRole";
  const API_URL_Modify_TYPE_ROLE =
    "http://localhost:4000/Administration/Admin/ModifyTypeRole";
  const API_URL_GET_ByID =
    "http://localhost:4000/Administration/Admin/GetTypeRoleByID";

  const [newTypeRoleName, setnewTypeRoleName] = useState("");
  const [newTypeRoleID, setnewTypeRoleID] = useState(0);
  const [newTypeDescriptionRole, setnewTypeDescriptionRole] = useState("");
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
      const response = await fetch(API_URL_Modify_TYPE_ROLE, requestOptions);
      if (response.status == 200) {
        alert("Se ingreso correctamente");
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    } else {
      const response = await fetch(API_URL_INSERT_TYPE_ROLE, requestOptions);
      if (response.status == 200) {
        alert("Se ingreso correctamente");
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    }
  };

  const getTypeRoleByIDRequest = async (ID) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_URL_GET_ByID, requestOptions);
    const data = await response.json();
    console.log(data);
    setnewTypeRoleID(data.tipo_Role_ID);
    setnewTypeRoleName(data.tipo_Role_Name);
    setnewTypeDescriptionRole(data.tipo_Role_Description);
  };

  const InsertEvent = async () => {
    if (isModify) {
      if (newTypeRoleName == "") {
        alert("Por favor ingrese el nombre");
      } else {
        if (newTypeRoleID == 0) {
          alert("Ocurrio un error al cargar los datos...");
        } else {
          if (newTypeDescriptionRole == "") {
            alert("Por favor ingrese la descripción...");
          } else {
            let obj = {
              tipo_Role_ID: newTypeRoleID,
              tipo_Role_Name: newTypeRoleName,
              tipo_role_Description: newTypeDescriptionRole,
            };
            InsertRequest(obj);
          }
        }
      }
    } else {
      if (newTypeRoleName == "") {
        alert("Por favor ingrese el nombre");
      } else {
        if (newTypeDescriptionRole == "") {
          alert("Por favor ingrese la descripción...");
        } else {
          let obj = {
            tipo_Role_Name: newTypeRoleName,
            tipo_role_Description: newTypeDescriptionRole,
          };
          InsertRequest(obj);
        }
      }
    }
  };

  useEffect(() => {
    if (objSelect != null) {
      setisModify(true);
      getTypeRoleByIDRequest(objSelect);
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
                    <InputGroup.Text>
                      Nombre del tipo de role
                    </InputGroup.Text>
                    <FormControl
                      aria-label="TypeRoleName"
                      value={newTypeRoleName}
                      type="text"
                      onChange={(event) =>
                        setnewTypeRoleName(event.target.value)
                      }
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      Descripcion del tipo de role
                    </InputGroup.Text>
                    <FormControl
                      aria-label="TypeRoleDescription"
                      value={newTypeDescriptionRole}
                      type="text"
                      onChange={(event) =>
                        setnewTypeDescriptionRole(event.target.value)
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
