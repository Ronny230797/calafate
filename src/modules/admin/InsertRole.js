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

export default function InsertRole() {
  const API_URL_INSERT_ROLE =
    "http://localhost:4000/Administration/Admin/InsertRole";
  const API_URL_Modify_ROLE =
    "http://localhost:4000/Administration/Admin/ModifyRole";
  const API_URL_GET_ByID =
    "http://localhost:4000/Administration/Admin/GetyRoleByID";
  const API_URL_GET_USER =
    "http://localhost:4000/Administration/Admin/GetAllUser";
  const API_URL_GET_TYPE_ROLE =
    "http://localhost:4000/Administration/Admin/GetAllTypeRole";

  const [resUserData, setresUserData] = useState([]);
  const [resTypeRoleData, setresTypeRoleData] = useState([]);

  const [newRoleID, setnewRoleID] = useState(0);
  const [newUserRole, setnewUserRole] = useState(0);
  const [newTypeRoleRole, setnewTypeRoleRole] = useState(0);
  const [DateValue, setDateValue] = useState(new Date());
  const [newRoleDescription, setnewRoleDescription] = useState("");
  const [isModify, setisModify] = useState(false);
  const location = useLocation();
  const objSelect = location.state;

  const InsertRequest = async (obj) => {
    console.log(obj);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    if (isModify) {
      console.log("Modificando...");
      const response = await fetch(API_URL_Modify_ROLE, requestOptions);
      if (response.status === 200) {
        alert("Se ingreso correctamente");
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    } else {
      console.log("Insertando...");
      const response = await fetch(API_URL_INSERT_ROLE, requestOptions);
      if (response.status === 200) {
        alert("Se ingreso correctamente");
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    }
  };

  const getUsersRequest = async () => {
    const response = await fetch(API_URL_GET_USER);
    const data = await response.json();
    console.log(data);
    setresUserData(data);
  };

  const getTypeRoleRequest = async () => {
    const response = await fetch(API_URL_GET_TYPE_ROLE);
    const data = await response.json();
    console.log(data);
    setresTypeRoleData(data);
  };

  const getRoleByIDRequest = async (ID) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_URL_GET_ByID, requestOptions);
    const data = await response.json();
    console.log(data);
    setnewRoleID(data.role_ID);
    setnewUserRole(data.fK_Usuario_Role);
    setnewTypeRoleRole(data.fK_Tipo_Role_Role);
    setDateValue(data.role_Date);
    setnewRoleDescription(data.role_Description);
  };

  const InsertEvent = async () => {
    if (isModify) {
      if (newRoleID === 0) {
        alert("Hubo un error al cargar los datos...");
      } else {
        if (newUserRole === 0) {
          alert("Por favor ingrese el Tipo de permiso");
        } else {
          if (newTypeRoleRole === 0) {
            alert("Por favor ingrese el Tipo de role");
          } else {
            if (DateValue === null) {
              alert("Ingrese una fecha valida");
            } else {
              if (newRoleDescription === "") {
                alert("Ingrese una descripción valida");
              } else {
                let obj = {
                  Role_ID: newRoleID,
                  FK_Usuario_Role: newUserRole,
                  FK_Tipo_Role_Role: newTypeRoleRole,
                  Role_Date: DateValue,
                  Role_Description: newRoleDescription,
                };
                InsertRequest(obj);
              }
            }
          }
        }
      }
    } else {
      if (newUserRole === 0) {
        alert("Por favor ingrese el Tipo de permiso");
      } else {
        if (newTypeRoleRole === 0) {
          alert("Por favor ingrese el Tipo de role");
        } else {
          if (DateValue === null) {
            alert("Ingrese una fecha valida");
          } else {
            if (newRoleDescription === "") {
              alert("Ingrese una descripción valida");
            } else {
              let obj = {
                FK_Usuario_Role: newUserRole,
                FK_Tipo_Role_Role: newTypeRoleRole,
                Role_Date: DateValue.toISOString(),
                Role_Description: newRoleDescription,
              };
              InsertRequest(obj);
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    if (objSelect != null) {
      setisModify(true);
      getRoleByIDRequest(objSelect);
      getUsersRequest();
      getTypeRoleRequest();
    } else {
      setisModify(false);
      getUsersRequest();
      getTypeRoleRequest();
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
                      Asignele a la persona seleccionada los roles.
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <FormSelect
                    onChange={(event) => setnewUserRole(event.target.value)}
                    aria-label="UserInformation"
                  >
                    <option value={0}>Seleccione al usuario.</option>
                    {resUserData.map((AllUser) => (
                      <option
                        key={AllUser.usuario_ID}
                        value={AllUser.usuario_ID}
                      >
                        Nombre: {AllUser.firstName} - Usuario: {AllUser.usuario_Username}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <FormSelect
                    onChange={(event) => setnewTypeRoleRole(event.target.value)}
                    aria-label="TypeRole"
                  >
                    <option value={0}>Seleccione el tipo de role</option>
                    {resTypeRoleData.map((TypeRole) => (
                      <option
                        key={TypeRole.tipo_Role_ID}
                        value={TypeRole.tipo_Role_ID}
                      >
                        {TypeRole.tipo_Role_Name}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Agrega una descripción que le permita identifar esta asignación.</InputGroup.Text>
                    <FormControl
                      aria-label="Description"
                      value={newRoleDescription}
                      type="text"
                      onChange={(event) =>
                        setnewRoleDescription(`${event.target.value}`)
                      }
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <Button onClick={InsertEvent}>
                    {isModify ? "Modificar" : "Ingresar"}
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
