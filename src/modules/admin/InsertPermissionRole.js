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
  Form,
  FormGroup,
} from "react-bootstrap";
import "../../styles/admin/InsertDish.scss";
import DatePicker from "react-date-picker";

export default function InsertPermissionRole() {
  const API_URL_INSERT_PERMISSION_ROLE =
    "http://localhost:4000/Administration/Admin/InsertPermissonRole";
  const API_URL_Modify_PERMISSION_ROLE =
    "http://localhost:4000/Administration/Admin/ModifyPermissionRole";
  const API_URL_GET_ByID =
    "http://localhost:4000/Administration/Admin/GetPermissionRoleByID";
  const API_URL_GET_TYPE_PERMISSION =
    "http://localhost:4000/Administration/Admin/GetAllTypePermission";
  const API_URL_GET_TYPE_ROLE =
    "http://localhost:4000/Administration/Admin/GetAllTypeRole";

  const [resTypePermissionData, setresTypePermissionData] = useState([]);
  const [resTypeRoleData, setresTypeRoleData] = useState([]);

  const [newPermissionRoleName, setnewPermissionRoleName] = useState("");
  const [newTypePermission, setnewTypePermission] = useState(0);
  const [newTypeRole, setnewTypeRole] = useState(0);
  const [newPermissionRoleID, setnewPermissionRoleID] = useState(0);
  const [newPermissionRoleDate, setnewPermissionRoleDate] = useState([]);
  const [newPermissionRoleIsActive, setnewPermissionRoleIsActive] =
    useState(true);
  const [DateValue, setDateValue] = useState(new Date());
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
      console.log("Modificando...")
      const response = await fetch(
        API_URL_Modify_PERMISSION_ROLE,
        requestOptions
      );
      if (response.status === 200) {
        alert("Se ingreso correctamente");
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    } else {
      console.log("Insertando...")
      const response = await fetch(
        API_URL_INSERT_PERMISSION_ROLE,
        requestOptions
      );
      if (response.status === 200) {
        alert("Se ingreso correctamente");
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    }
  };

  const getTypePermissionRequest = async () => {
    const response = await fetch(API_URL_GET_TYPE_PERMISSION);
    const data = await response.json();
    console.log(data);
    setresTypePermissionData(data);
  };

  const getTypeRoleRequest = async () => {
    const response = await fetch(API_URL_GET_TYPE_ROLE);
    const data = await response.json();
    console.log(data);
    setresTypeRoleData(data);
  };

  const getPermissionRoleByIDRequest = async (ID) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_URL_GET_ByID, requestOptions);
    const data = await response.json();
    console.log(data);
    setnewPermissionRoleID(data.permiso_Role_ID);
    setnewTypePermission(data.fK_TipoPermiso_Permiso_Role);
    setnewTypeRole(data.fK_TipoRole_Permiso_Role);
    setnewPermissionRoleDate(data.dateCreated);
    setnewPermissionRoleIsActive(data.IsActive);
    setnewPermissionRoleName(data.Permiso_Role_Name);
  };

  const InsertEvent = async () => {
    if (isModify) {
      if (newTypePermission === 0) {
        alert("Por favor ingrese el Tipo de permiso");
      } else {
        if (newTypeRole === 0) {
          alert("Por favor ingrese el Tipo de role");
        } else {
          if (newPermissionRoleDate === null) {
            alert("Ingrese una fecha valida");
          } else {
            if (newPermissionRoleIsActive === null) {
              alert("Seleccione si el permiso esta activo o no.");
            } else {
              let obj = {
                Permiso_Role_ID: newPermissionRoleID,
                Fk_TipoPermiso_Permiso_Role: newTypePermission,
                Fk_TipoRole_Permiso_Role: newTypeRole,
                DateCreated: DateValue,
                IsActive: newPermissionRoleIsActive
              };
              InsertRequest(obj);
            }
          }
        }
      }
    } else {
      if (newTypePermission === 0) {
        alert("Por favor ingrese el Tipo de permiso");
      } else {
        if (newTypeRole === 0) {
          alert("Por favor ingrese el Tipo de role");
        } else {
          if (newPermissionRoleDate === null) {
            alert("Ingrese una fecha valida");
          } else {
            if (newPermissionRoleIsActive === null) {
              alert("Seleccione si el permiso esta activo o no.");
            } else {
              let obj = {
                Fk_TipoPermiso_Permiso_Role_Value: newTypePermission,
                Fk_TipoRole_Permiso_Role_Value: newTypeRole,
                DateCreated_Value: DateValue.toISOString(),
                isActive_Value: newPermissionRoleIsActive
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
      getPermissionRoleByIDRequest(objSelect);
      getTypePermissionRequest();
      getTypeRoleRequest();
    } else {
      setisModify(false);
      getTypePermissionRequest();
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
                  <Form.Group>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        Asigne los permisos que desea agregar al role
                        seleccionado.
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <FormSelect
                    onChange={(event) => setnewTypeRole(event.target.value)}
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
                  <FormSelect
                    onChange={(event) =>
                      setnewTypePermission(event.target.value)
                    }
                    aria-label="TypePermission"
                  >
                    <option value={0}>Seleccione el tipo de permiso</option>
                    {resTypePermissionData.map((TypePermission) => (
                      <option
                        key={TypePermission.tipo_Permiso_ID}
                        value={TypePermission.tipo_Permiso_ID}
                      >
                        {TypePermission.tipo_Permiso_Name}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Esta activo" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <DatePicker onChange={setDateValue} value={DateValue}>Seleccione la fecha.</DatePicker>
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
