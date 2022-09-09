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


export default function InsertBusinessUnit(props) {

  const API_URL_INSERT_BUSINESS_UNIT = "http://localhost:4000/Administration/Admin/InsertBusinessUnit";
  const API_URL_Modify_BUSINESS_UNIT = "http://localhost:4000/Administration/Admin/ModifyBusinessUnit";
  const API_URL_GET_ByID = "http://localhost:4000/Administration/Admin/GetBusinessUnitByID";

  const alert = useAlert();
  const [resData, setresData] = useState([]);
  const [newBusinessUnitID, setnewBusinessUnitID] = useState(0);
  const [newBusinessUnitParent, setnewBusinessUnitParent] = useState(0);
  const [newBusinessUnitName, setnewBusinessUnitName] = useState("");
  const [newBusinessUnitDescription, setnewBusinessUnitDescription] =
    useState("");
  const [isModify, setisModify] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const objSelect = props.id;

  const InsertRequest = async (obj) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    if (isModify) {
      const response = await fetch(API_URL_Modify_BUSINESS_UNIT, requestOptions);
      const data = await response.json();
      if (response.status == 200) {
        alert.show("Se ingreso correctamente");
        window.location.reload();
      } else {
        alert.show("Ocurrio un error: " + response.status);
      }
    } else {
      const response = await fetch(API_URL_INSERT_BUSINESS_UNIT, requestOptions);
      const data = await response.json();
      if (response.status == 200) {
        alert.show("Se ingreso correctamente");
        setnewBusinessUnitID(0);
        setnewBusinessUnitParent(0);
        setnewBusinessUnitName("");
        setnewBusinessUnitDescription("");
        window.location.reload();
      } else {
        alert.show("Ocurrio un error: " + response.status);
      }
    }
  };

  const getBusinessUnitByIDRequest = async (ID) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_URL_GET_ByID, requestOptions);
    const data = await response.json();
    setnewBusinessUnitID(data.unidad_Negocio_ID);
    setnewBusinessUnitParent(data.unidad_Negocio_Parent);
    setnewBusinessUnitName(data.unidad_Negocio_Name);
    setnewBusinessUnitDescription(data.unidad_Negocio_Description);
  };

  const InsertEvent = async () => {
    if (isModify) {
      if (newBusinessUnitID === 0) {
        alert.show("ocurrio un problema cargando los datos.");
      } else {
        if (newBusinessUnitName === "") {
          alert.show("Ingrese el nombre por favor.");
        } else {
          if (newBusinessUnitDescription === "") {
            alert.show("Ingrese la descripción por favor.");
          } else {
            let obj = {
              Unidad_Negocio_ID: newBusinessUnitID,
              Unidad_Negocio_Name: newBusinessUnitName,
              Unidad_Negocio_Description: newBusinessUnitDescription,
            };
            InsertRequest(obj);
          }
        }
      }
    } else {
      if (newBusinessUnitName === "") {
        alert.show("Ingrese el nombre por favor.");
      } else {
        if (newBusinessUnitDescription === "") {
          alert.show("Ingrese la descripción por favor.");
        } else {
          let obj = {
            Unidad_Negocio_Name: newBusinessUnitName,
            Unidad_Negocio_Description: newBusinessUnitDescription,
          };
          InsertRequest(obj);
        }
      }
    }
  };


  useEffect(() => {
    if (objSelect != null || objSelect != undefined) {
      setisModify(true);
      getBusinessUnitByIDRequest(objSelect);
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
          <h2 id="parent-modal-title">Nuevo Tipo Platillo</h2>
          <React.Fragment>
            <Container className="InsertDish">
              <Row>
                <Col xs={12} md={12}>
                  <div className="InsertDish-card">
                    <Row>
                      <Col xs={10} md={10}>
                        <InputGroup className="mb-3">
                          <InputGroup.Text>Nombre del local.</InputGroup.Text>
                          <FormControl
                            aria-label="BusinessUnitName"
                            value={newBusinessUnitName}
                            type="text"
                            onChange={(event) =>
                              setnewBusinessUnitName(event.target.value)
                            }
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={10} md={10}>
                        <InputGroup className="mb-3">
                          <InputGroup.Text>Descripción del local.</InputGroup.Text>
                          <FormControl
                            aria-label="BusinessUnitDescription"
                            value={newBusinessUnitDescription}
                            type="text"
                            onChange={(event) =>
                              setnewBusinessUnitDescription(event.target.value)
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
