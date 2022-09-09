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
} from "react-bootstrap";
import "../../styles/admin/InsertDish.scss";
import { useAlert } from "react-alert";
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


export default function InsertTypeUser(props) {

  const API_URL_INSERT_TYPE_USER = "http://localhost:4000/Administration/Admin/InsertUserType";
  const API_URL_Modify_TYPE_USER = "http://localhost:4000/Administration/Admin/ModifyUserType";
  const API_URL_GET_ByID = "http://localhost:4000/Administration/Admin/GetUserTypeByID";

  const [resData, setresData] = useState([]);
  const [userTypeID, setuserTypeID] = useState(0);
  const [userTypeName, setuserTypeName] = useState("");
  const [userTypeDescription, setuserTypeDescription] = useState("");
  const [isModify, setisModify] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const objSelect = props.id;
  const alert = useAlert();
  const InsertRequest = async (obj) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    if (isModify) {
      const response = await fetch(API_URL_Modify_TYPE_USER, requestOptions);
      const data = await response.json();
      setresData(data);
      if (response.status == 200) {
        alert.show("Se ingreso correctamente");
        window.location.reload();
      } else {
        alert.show("Ocurrio un error: " + response.status);
      }
    } else {
      const response = await fetch(API_URL_INSERT_TYPE_USER, requestOptions);
      const data = await response.json();
      setresData(data);
      if (response.status == 200) {
        alert.show("Se ingreso correctamente");
        setuserTypeID(0);
        setuserTypeName("");
        setuserTypeDescription("");
        window.location.reload();
      } else {
        alert.show("Ocurrio un error: " + response.status);
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
        alert.show("Ingrese el nombre, por favor");
      } else {
        if (userTypeDescription === "") {
          alert.show("Ingrese la descripción, por favor.");
        } else {
          if (userTypeID === 0) {
            alert.show("No se cargaron los datos correctamente.");
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
        alert.show("Ingrese el nombre, por favor");
      } else {
        if (userTypeDescription === "") {
          alert.show("Ingrese la descripción, por favor.");
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
    if (objSelect != null || objSelect != undefined) {
      setisModify(true);
      getUserTypeByIDRequest(objSelect);
    } else {
      setisModify(false);
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
          <h2 id="parent-modal-title">Nuevo Tipo Usuario</h2>
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
        </Box>
      </Modal>
    </div>
  );
}
