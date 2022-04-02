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

export default function InsertPermissionRole() {
  const API_URL_INSERT_PERMISSION_ROLE =
    "http://localhost:4000/Administration/Admin/";
  const API_URL_Modify_PERMISSION_ROLE =
    "http://localhost:4000/Administration/Admin/";
  const API_URL_GET_ByID = "http://localhost:4000/Administration/Admin/";
  const API_URL_GET_TYPE_PERMISSION = "http://localhost:4000/Administration/Admin/";
  const API_URL_GET_TYPE_ROLE = "http://localhost:4000/Administration/Admin/";

  const [resTypePermissionData, setresTypePermissionData] = useState([]);
  const [resTypeRoleData, setresTypeRoleData] = useState([]);

  const [newPermissionRoleName, setnewPermissionRoleName] = useState(0);
  const [newTypePermission, setnewTypePermission] = useState(0);
  const [newTypeRole, setnewTypeRole] = useState(0);
  const [newPermissionRoleID, setnewPermissionRoleID] = useState(0);
  const [newPermissionRoleDate, setnewPermissionRoleDate] = useState([]);
  const [newPermissionRoleIsActive, setnewPermissionRoleIsActive] = useState(true);

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
      const response = await fetch(
        API_URL_Modify_PERMISSION_ROLE,
        requestOptions
      );
      if (response.status == 200) {
        alert("Se ingreso correctamente");
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    } else {
      const response = await fetch(
        API_URL_INSERT_PERMISSION_ROLE,
        requestOptions
      );
      if (response.status == 200) {
        alert("Se ingreso correctamente");
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    }
  };

  const getTypesRequest = async () => {
    const response = await fetch(API_URL_GET_TYPE_PERMISSION);
    const data = await response.json();
    setresTypePermissionData(data);

    response = await fetch(API_URL_GET_TYPE_ROLE);
    data = await response.json();
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
    setnewTypePermission();
    setnewTypeRole();
    setnewPermissionRoleID();
    setnewPermissionRoleDate();
    setnewPermissionRoleIsActive();
  };

  const InsertEvent = async () => {
    if (isModify) {
      if (newTypePermission == 0) {
        alert("Por favor ingrese el Tipo de permiso");
      } else {
        if (newTypeRole == 0) {
          alert("Por favor ingrese el Tipo de role");
        } else {
          if (newPermissionRoleDate == null) {
            alert("Ingrese una fecha valida");
          } else {
            if (newPermissionRoleIsActive == null) {
              alert("Seleccione si el permiso esta activo o no.");
            } else {
              let obj = {
                permiso_Role_ID: newPermissionRoleID,
                Fk_TipoPermiso_Permiso_Role_Value: newTypePermission,
                Fk_TipoRole_Permiso_Role_Value: newTypeRole,
                DateCreated_Value: newPermissionRoleDate,
                isActive_Value: newPermissionRoleIsActive,
              };
              InsertRequest(obj);
            }
          }
        }
      }
    } else {
      if (newTypePermission == 0) {
        alert("Por favor ingrese el Tipo de permiso");
      } else {
        if (newTypeRole == 0) {
          alert("Por favor ingrese el Tipo de role");
        } else {
          if (newPermissionRoleDate == null) {
            alert("Ingrese una fecha valida");
          } else {
            if (newPermissionRoleIsActive == null) {
              alert("Seleccione si el permiso esta activo o no.");
            } else {
              let obj = {
                Fk_TipoPermiso_Permiso_Role_Value: newTypePermission,
                Fk_TipoRole_Permiso_Role_Value: newTypeRole,
                DateCreated_Value: newPermissionRoleDate,
                isActive_Value: newPermissionRoleIsActive,
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
      getTypesRequest();
    } else {
      setisModify(false);
      getTypesRequest();
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
                      Nombre del nuevo permiso
                    </InputGroup.Text>
                    <FormControl
                      aria-label="PermissionRoleName"
                      value={newPermissionRoleName}
                      type="text"
                      onChange={(event) =>
                        setnewTypeDishName(event.target.value)
                      }
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <FormSelect
                    onChange={(event) => setTypeNewDish(event.target.value)}
                    aria-label="TypePermission"
                  >
                    <option value={0}>Seleccione el tipo de permiso</option>
                    {resTypePermissionData.map((TypePermission) => (
                      <option
                        key={TypePermission.tipo_Plato_Bebida_ID}
                        value={TypePermission.tipo_Plato_Bebida_ID}
                      >
                        {TypePermission.tipo_Plato_Bebida_Name}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <FormSelect
                    onChange={(event) => setTypeNewDish(event.target.value)}
                    aria-label="TypeRole"
                  >
                    <option value={0}>Seleccione el tipo de role</option>
                    {resTypeRoleData.map((TypeRole) => (
                      <option
                        key={TypeRole.tipo_Plato_Bebida_ID}
                        value={TypeRole.tipo_Plato_Bebida_ID}
                      >
                        {TypeRole.tipo_Plato_Bebida_Name}
                      </option>
                    ))}
                  </FormSelect>
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
