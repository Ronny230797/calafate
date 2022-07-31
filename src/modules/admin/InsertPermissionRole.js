import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  FormSelect,
  Form
} from "react-bootstrap";
import "../../styles/admin/InsertDish.scss";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


export default function InsertPermissionRole(props) {

  const API_URL_INSERT_PERMISSION_ROLE = "http://localhost:4000/Administration/Admin/InsertPermissonRole";
  const API_URL_Modify_PERMISSION_ROLE = "http://localhost:4000/Administration/Admin/ModifyPermissionRole";
  const API_URL_GET_ByID = "http://localhost:4000/Administration/Admin/GetPermissionRoleByID";
  const API_URL_GET_TYPE_PERMISSION = "http://localhost:4000/Administration/Admin/GetAllTypePermission";
  const API_URL_GET_TYPE_ROLE = "http://localhost:4000/Administration/Admin/GetAllTypeRole";

  const [resTypePermissionData, setresTypePermissionData] = useState([]);
  const [resTypeRoleData, setresTypeRoleData] = useState([]);
  const [newTypePermission, setnewTypePermission] = useState(0);
  const [newTypeRole, setnewTypeRole] = useState(0);
  const [newPermissionRoleID, setnewPermissionRoleID] = useState(0);
  const [newTypePermissionName, setnewTypePermissionName] = useState("");
  const [newTypeRoleName, setnewTypeRoleName] = useState("");
  const [newPermissionRoleDate, setnewPermissionRoleDate] = useState(new Date());
  const [newPermissionRoleIsActive, setnewPermissionRoleIsActive] = useState(true);
  const [isModify, setisModify] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const objSelect = props.id;

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
        window.location.reload();
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
    setnewTypePermissionName(data.tipo_Permiso_Name);
    setnewTypeRole(data.fK_TipoRole_Permiso_Role);
    setnewTypeRoleName(data.tipo_Role_Name)
    setnewPermissionRoleDate(data.dateCreated);
    setnewPermissionRoleIsActive(data.IsActive);
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
                permiso_Role_ID: newPermissionRoleID,
                fk_TipoPermiso_Permiso_Role: newTypePermission,
                fk_TipoRole_Permiso_Role: newTypeRole,
                dateCreated: newPermissionRoleDate,
                isActive: newPermissionRoleIsActive,
                tipo_Permiso_Name: newTypePermissionName,
                tipo_Role_Name: newTypeRoleName
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
                fk_TipoPermiso_Permiso_Role: newTypePermission,
                fk_TipoRole_Permiso_Role: newTypeRole,
                dateCreated: newPermissionRoleDate,
                isActive: newPermissionRoleIsActive,
                tipo_Permiso_Name: newTypePermissionName,
                tipo_Role_Name: newTypeRoleName
              };
              InsertRequest(obj);
            }
          }
        }
      }
    }
  };

  const changeIsActive = () => {
    setnewPermissionRoleIsActive(!newPermissionRoleIsActive)
  }

  useEffect(() => {
    if (objSelect != null || objSelect != undefined) {
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


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>{isModify ? "Modificar" : "Agregar"}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Permisos por role</h2>
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
                            {isModify ? 
                            <label>
                              Estado actual: Tipo role: {newTypeRoleName} - Tipo permiso: {newTypePermissionName}
                            </label> : 
                            <InputGroup.Text>

                            </InputGroup.Text>}

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
                          <Form.Check type="checkbox" label="Esta activo" onChange={changeIsActive} />
                        </Form.Group>
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
        </Box>
      </Modal>
    </div>
  );
}
