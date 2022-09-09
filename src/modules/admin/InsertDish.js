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


export default function InsertDish(props) {

  const API_URL_INSERT_DISH = "http://localhost:4000/Administration/Admin/InsertDish";
  const API_URL_Modify_DISH = "http://localhost:4000/Administration/Admin/ModifyDish";
  const API_URL_GET_Type = "http://localhost:4000/Administration/Admin/GetAllTypeDishDrink";
  const API_URL_GET_ByID = "http://localhost:4000/Administration/Admin/GetDishByID";


  const [typeDishData, setTypeDishData] = useState([]);
  const [typeNewDish, setTypeNewDish] = useState(0);
  const [IDNewDish, setIDNewDish] = useState([]);
  const [nameNewDish, setNameNewDish] = useState([]);
  const [descriptionNewDish, setDescriptionNewDish] = useState([]);
  const [priceNewDish, setPriceNewDish] = useState(0);
  const [dishModify, setdishModify] = useState([]);
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
      const response = await fetch(API_URL_Modify_DISH, requestOptions);
      const data = await response.json();
      if (response.status == 200) {
        alert("Se ingreso correctamente");
        window.location.reload();
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    } else {
      const response = await fetch(API_URL_INSERT_DISH, requestOptions);
      const data = await response.json();
      if (response.status == 200) {
        alert("Se ingreso correctamente");
        setIDNewDish(0);
        setNameNewDish("");
        setTypeNewDish(0);
        setDescriptionNewDish("");
        setPriceNewDish(0);
        window.location.reload();
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    }
  };

  const getTypeDishRequest = async () => {
    const response = await fetch(API_URL_GET_Type);
    const data = await response.json();
    setTypeDishData(data);
  };

  const getDishByIDRequest = async (ID) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_URL_GET_ByID, requestOptions);
    const data = await response.json();
    setIDNewDish(data.platoID);
    setTypeNewDish(data.tipo_Plato_Bebida);
    setNameNewDish(data.plato_Bebida_Nombre);
    setDescriptionNewDish(data.plato_Bebida_Descripcion);
    setPriceNewDish(data.precio);
  };

  const InsertEvent = async () => {
    if (typeNewDish == 0) {
      alert("No se selecciono el tipo de platillo");
    } else {
      if (isModify) {
        let obj = {
          PlatoID: IDNewDish,
          Tipo_Plato_Bebida: typeNewDish,
          Plato_Bebida_Nombre: nameNewDish,
          Plato_Bebida_Descripcion: descriptionNewDish,
          Precio: priceNewDish,
        };
        InsertRequest(obj);
      } else {
        let obj = {
          Tipo_Plato_Bebida: typeNewDish,
          Plato_Bebida_Nombre: nameNewDish,
          Plato_Bebida_Descripcion: descriptionNewDish,
          Precio: priceNewDish,
        };
        InsertRequest(obj);
      }
    }
  };

  useEffect(() => {
    if (objSelect != null || objSelect != undefined) {
      setisModify(true);
      getDishByIDRequest(objSelect);
      getTypeDishRequest();
    } else {
      setisModify(false);
      getTypeDishRequest();
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
                        <FormSelect
                          onChange={(event) => setTypeNewDish(event.target.value)}
                          aria-label="Tipo de platillo"
                        >
                          <option value={0}>Seleccione el tipo platillo</option>
                          {typeDishData.map((TypeDishes) => (
                            <option
                              key={TypeDishes.tipo_Plato_Bebida_ID}
                              value={TypeDishes.tipo_Plato_Bebida_ID}
                            >
                              {TypeDishes.tipo_Plato_Bebida_Name}
                            </option>
                          ))}
                        </FormSelect>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={10} md={10}>
                        <InputGroup className="mb-3">
                          <InputGroup.Text>
                            Nombre del platillo/Bebida
                          </InputGroup.Text>
                          <FormControl
                            aria-label="Platillo/Bebida"
                            value={nameNewDish}
                            type="text"
                            onChange={(event) => setNameNewDish(event.target.value)}
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={10} md={10}>
                        <InputGroup className="mb-3">
                          <InputGroup.Text>
                            Descripcion del platillo/Bebida
                          </InputGroup.Text>
                          <FormControl
                            aria-label="Descripción"
                            value={descriptionNewDish}
                            type="text"
                            onChange={(event) =>
                              setDescriptionNewDish(event.target.value)
                            }
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={10} md={10}>
                        <InputGroup className="mb-3">
                          <InputGroup.Text>
                            Precio del platillo/Bebida
                          </InputGroup.Text>
                          <FormControl
                            aria-label="Precio venta"
                            value={priceNewDish}
                            type="text"
                            onChange={(event) => setPriceNewDish(event.target.value)}
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
