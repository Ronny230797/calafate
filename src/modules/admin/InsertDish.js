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
  const API_URL = "http://localhost:4000/Administration/Admin/InsertDish";
  const API_URL_GET_Type =
    "http://localhost:4000/Administration/Admin/GetAllTypeDishDrink";

  const API_URL_GET_ByID =
    "http://localhost:4000/Administration/Admin/GetDishByID";

  const [resData, setresData] = useState([]);
  const [typeDishData, setTypeDishData] = useState([]);
  const [typeNewDish, setTypeNewDish] = useState(0);
  const [nameNewDish, setNameNewDish] = useState([]);
  const [descriptionNewDish, setDescriptionNewDish] = useState([]);
  const [priceNewDish, setPriceNewDish] = useState([]);
  const [dishModify, setdishModify] = useState([]);
  const location = useLocation();
  const objSelect = location.state;

  const InsertRequest = async (obj) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    const response = await fetch(API_URL, requestOptions);
    setresData(response);

    console.log(response);
    if (response.OK) {
      alert("Se ingreso correctamente");
    } else {
      alert("Ocurrio un error: " + response);
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
    setdishModify(response);
  };

  const InsertEvent = async () => {
    if (typeNewDish == 0) {
      alert("No se selecciono el tipo de platillo");
    } else {
      let obj = {
        Tipo_Plato_Bebida: typeNewDish,
        Plato_Bebida_Nombre: nameNewDish,
        Plato_Bebida_Descripcion: descriptionNewDish,
        Precio: priceNewDish,
      };
      /**InsertRequest(obj);**/
    }
  };

  useEffect(() => {
    if (objSelect != null) {
      let ID = {
        dishID: objSelect,
      };
      getDishByIDRequest(ID);

      if (dishModify != null) {
        console.log(dishModify);
        setTypeNewDish(dishModify.Tipo_Plato_Bebida);
        setNameNewDish(dishModify.Plato_Bebida_Nombre);
        setDescriptionNewDish(dishModify.Plato_Bebida_Descripcion);
        setPriceNewDish(dishModify.Precio);
        console.log("Si trae parametro");
        getTypeDishRequest();
      }else { 
        alert("Ocurrio un error al cargar los datos...")
      }
    } else {
      console.log("No trae parametro");
      getTypeDishRequest();
    }
  }, [objSelect]);

  return (
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
                    <option value={0}>Seleccione el tipo</option>
                    {typeDishData.map((TypeDishes) => (
                      <option value={TypeDishes.tipo_Plato_Bebida_ID}>
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
              <Button onClick={InsertEvent}>Ingresar</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
