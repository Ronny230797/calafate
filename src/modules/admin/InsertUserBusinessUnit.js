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
import DatePicker from "react-date-picker";

export default function InsertUserBusinessUnit() {
  const API_URL = "http://localhost:4000/Administration/Admin/InsertUserBusinessUnit";
  const API_URL_Modify = "http://localhost:4000/Administration/Admin/ModifyUserBusinessUnit";
  const API_URL_GET_USER = "http://localhost:4000/Administration/Admin/GetAllUser";
  const API_URL_GET_BUSINESS_UNIT =
    "http://localhost:4000/Administration/Admin/GetAllBusinessUnit";
  const API_URL_GET_ByID = "http://localhost:4000/Administration/Admin/GetUserBusinessUnitByID";

  const [resData, setresData] = useState([]);
  const [newUserBusinessUnitID, setnewUserBusinessUnitID] = useState(0);
  const [newUserID, setnewUserID] = useState(0);
  const [newBusinessUnitID, setnewBusinessUnitID] = useState(0);
  const [newCreateDate, setnewCreateDate] = useState(new Date());
  const [newDescription, setnewDescription] = useState("");
  const [resUserData, setresUserData] = useState([]);
  const [resBusinessUnitData, setresBusinessUnitData] = useState([]);
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
      if (response.status == 200) {
        alert("Se ingreso correctamente");
        setnewBusinessUnitID(0);
        setnewUserBusinessUnitID(0);
        setnewUserID(0);
        setnewDescription("");
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    }
  };

  const getUserRequest = async () => {
    const response = await fetch(API_URL_GET_USER);
    const data = await response.json();
    setresUserData(data);
  };

  const getBusinessUnitRequest = async () => {
    const response = await fetch(API_URL_GET_BUSINESS_UNIT);
    const data = await response.json();
    setresBusinessUnitData(data);
  };

  const getUserBusinessUnitByIDRequest = async (ID) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_URL_GET_ByID, requestOptions);
    const data = await response.json();
    setnewUserBusinessUnitID(data.usuario_Unidad_Negocio_ID);
    setnewUserID(data.fK_Usuario_Usuario_Unidad_Negocio);
    setnewBusinessUnitID(data.fK_Unidad_Negocio_Usuario_Unidad_Negocio);
    setnewCreateDate(data.usuario_Unidad_Negocio_Date);
    setnewDescription(data.usuario_Unidad_Negocio_Description);
  };

  const InsertEvent = async () => {
    if (isModify) {
      if (newUserBusinessUnitID === 0) {
        alert("No se cargaron los datos de manera correcta.");
      } else {
        if (newUserID === 0) {
          alert("Inserte el usuario a asignar.");
        } else {
          if (newBusinessUnitID === 0) {
            alert("Seleccione el local a asignar.");
          } else {
            if (newDescription === 0) {
              alert("Agregue una descripción válida.");
            } else {
              let obj = {
                usuario_Unidad_Negocio_ID: newUserBusinessUnitID,
                fK_Usuario_Usuario_Unidad_Negocio: newUserID,
                fK_Unidad_Negocio_Usuario_Unidad_Negocio: newBusinessUnitID,
                usuario_Unidad_Negocio_Date: newCreateDate,
                usuario_Unidad_Negocio_Description: newDescription,
              };
              InsertRequest(obj);
            }
          }
        }
      }
    } else {
      if (newUserID === 0) {
        alert("Inserte el usuario a asignar.");
      } else {
        if (newBusinessUnitID === 0) {
          alert("Seleccione el local a asignar.");
        } else {
          if (newDescription === 0) {
            alert("Agregue una descripción válida.");
          } else {
            let obj = {
              fK_Usuario_Usuario_Unidad_Negocio: newUserID,
              fK_Unidad_Negocio_Usuario_Unidad_Negocio: newBusinessUnitID,
              usuario_Unidad_Negocio_Date: newCreateDate,
              usuario_Unidad_Negocio_Description: newDescription,
            };
            InsertRequest(obj);
          }
        }
      }
    }
  };

  useEffect(() => {
    if (objSelect != null) {
      setisModify(true);
      getUserBusinessUnitByIDRequest(objSelect);
      getUserRequest();
      getBusinessUnitRequest();
    } else {
      setisModify(false);
      getUserRequest();
      getBusinessUnitRequest();
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
                  <FormSelect
                    onChange={(event) => setnewUserID(event.target.value)}
                    aria-label="AllUser"
                  >
                    <option value={0}>Seleccione el usuario al que le desea asignar un local.</option>
                    {resUserData.map((AllUser) => (
                      <option
                        key={AllUser.usuario_ID}
                        value={AllUser.usuario_ID}
                      >
                        {AllUser.firstName} {AllUser.usuario_First_Last_Name}{" "}
                        {AllUser.usuario_Second_Last_Name}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <FormSelect
                    onChange={(event) =>
                      setnewBusinessUnitID(event.target.value)
                    }
                    aria-label="AllBusinessUnit"
                  >
                    <option value={0}>Seleccione el local que desea asignar.</option>
                    {resBusinessUnitData.map((AllBusinessUnit) => (
                      <option
                        key={AllBusinessUnit.unidad_Negocio_ID}
                        value={AllBusinessUnit.unidad_Negocio_ID}
                      >
                        {AllBusinessUnit.unidad_Negocio_Name}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Agregue una descripción de la asiganción.</InputGroup.Text>
                    <FormControl
                      aria-label="DescriptionBusinessUnit"
                      value={newDescription}
                      type="text"
                      onChange={(event) =>
                        setnewDescription(event.target.value)
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
