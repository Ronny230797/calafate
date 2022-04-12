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

export default function InsertTypeDish(props) {
  const API_URL_INSERT_TYPE = "http://localhost:4000/Administration/Admin/InsertTypeDishDrink";
  const API_URL_Modify_TYPE = "http://localhost:4000/Administration/Admin/ModifyDish";
  const API_URL_GET_ByID = "http://localhost:4000/Administration/Admin/GetTypeDishDrinkByID";

  const [newTypeDishName, setnewTypeDishName] = useState("");
  const [newTypeDishID, setnewTypeDishID] = useState(0);
  const [newTypeDescriptionDish, setnewTypeDescriptionDish] = useState("");
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
      const response = await fetch(API_URL_Modify_TYPE, requestOptions);
      if (response.status == 200) {
        alert("Se ingreso correctamente");
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    } else {
      const response = await fetch(API_URL_INSERT_TYPE, requestOptions);
      if (response.status == 200) {
        alert("Se ingreso correctamente");
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    }
  };

  const getTypeDishByIDRequest = async (ID) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_URL_GET_ByID, requestOptions);
    const data = await response.json();
    console.log(data)
    setnewTypeDishID(data.tipo_Plato_Bebida_ID);
    setnewTypeDishName(data.tipo_Plato_Bebida_Name);
    setnewTypeDescriptionDish(data.tipo_Plato_Bebida_Description);
  };

  const InsertEvent = async () => {
    if(isModify) {
      if(newTypeDishName == "") {
        alert("Por favor ingrese el nombre")
      }else {
        if(newTypeDishID == 0) {
          alert("Ocurrio un error al cargar los datos...")
        }else {
          if(newTypeDescriptionDish == "") {
            alert("Por favor ingrese la descripción...")
          }else {
            let obj = {
              tipo_Plato_Bebida_ID : newTypeDishID,
              tipo_Plato_Bebida_Name : newTypeDishName,
              tipo_Plato_Bebida_Description : newTypeDescriptionDish
            }
            InsertRequest(obj);
          }
        }
      }
    }else {
      if(newTypeDishName == "") {
        alert("Por favor ingrese el nombre")
      }else {
        if(newTypeDescriptionDish == "") {
          alert("Por favor ingrese la descripción...")
        }else {
          let obj = {
            tipo_Plato_Bebida_Name : newTypeDishName,
            tipo_Plato_Bebida_Description : newTypeDescriptionDish
          }
          InsertRequest(obj);
        }
      }
    }
  };

  useEffect(() => {
    if (objSelect != null) {
      setisModify(true);
      getTypeDishByIDRequest(objSelect);
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
                      Nombre del tipo de platillo/Bebida
                    </InputGroup.Text>
                    <FormControl
                      aria-label="TipoPlatillo/BebidaNombre"
                      value={newTypeDishName}
                      type="text"
                      onChange={(event) => setnewTypeDishName(event.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      Descripcion del tipo platillo/Bebida
                    </InputGroup.Text>
                    <FormControl
                      aria-label="TipoPlatoDescripción"
                      value={newTypeDescriptionDish}
                      type="text"
                      onChange={(event) =>
                        setnewTypeDescriptionDish(event.target.value)
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
