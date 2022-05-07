import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

export default function InsertBusinessUnit() {
  const API_URL = "http://localhost:4000/Administration/Admin/InsertBusinessUnit";
  const API_URL_Modify = "http://localhost:4000/Administration/Admin/ModifyBusinessUnit";

  const API_URL_GET_ByID = "http://localhost:4000/Administration/Admin/GetBusinessUnitByID";

  const [resData, setresData] = useState([]);
  const [newBusinessUnitID, setnewBusinessUnitID] = useState(0);
  const [newBusinessUnitParent, setnewBusinessUnitParent] = useState(0);
  const [newBusinessUnitName, setnewBusinessUnitName] = useState("");
  const [newBusinessUnitDescription, setnewBusinessUnitDescription] =
    useState("");
  const [isModify, setisModify] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const objSelect = location.state;

  const InsertRequest = async (obj) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    if (isModify) {
      const response = await fetch(API_URL_Modify, requestOptions);
      const data = await response.json();
      setresData(data);
      if (response.status == 200) {
        alert("Se ingreso correctamente");
        navigate(-1);
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    } else {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      setresData(data);
      console.log(data.status);
      if (response.status == 200) {
        alert("Se ingreso correctamente");
        setnewBusinessUnitID(0);
        setnewBusinessUnitParent(0);
        setnewBusinessUnitName("");
        setnewBusinessUnitDescription("");
      } else {
        alert("Ocurrio un error: " + response.status);
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
        alert("ocurrio un problema cargando los datos.");
      } else {
        if (newBusinessUnitName === "") {
          alert("Ingrese el nombre por favor.");
        } else {
          if (newBusinessUnitDescription === "") {
            alert("Ingrese la descripción por favor.");
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
        alert("Ingrese el nombre por favor.");
      } else {
        if (newBusinessUnitDescription === "") {
          alert("Ingrese la descripción por favor.");
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
    if (objSelect != null) {
      setisModify(true);
      getBusinessUnitByIDRequest(objSelect);
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
  );
}
