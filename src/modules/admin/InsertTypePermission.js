import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "../../styles/admin/InsertDish.scss";
import { useAlert } from "react-alert";


export default function InsertTypePermission() {
  const API_URL_INSERT_TYPE_PERMISSION =
    "http://localhost:4000/Administration/Admin/InsertTypePermission";
  const API_URL_Modify_TYPE_PERMISSION =
    "http://localhost:4000/Administration/Admin/ModifyTypePermission";
  const API_URL_GET_ByID =
    "http://localhost:4000/Administration/Admin/GetTypePermissionByID";

  const [newTypePermissionName, setnewTypePermissionName] = useState([]);
  const [newTypePermissionDescription, setnewTypePermissionDescription] =
    useState([]);
  const [newTypePermissionID, setnewTypePermissionID] = useState([]);
  const [isModify, setisModify] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const objSelect = location.state;
  const alert = useAlert();
  const InsertRequest = async (obj) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    if (isModify) {
      const response = await fetch(
        API_URL_Modify_TYPE_PERMISSION,
        requestOptions
      );
      if (response.status == 200) {
        alert.show("Se ingreso correctamente");
        navigate(-1);
      } else {
        alert.show("Ocurrio un error: " + response.status);
      }
    } else {
      const response = await fetch(
        API_URL_INSERT_TYPE_PERMISSION,
        requestOptions
      );
      if (response.status == 200) {
        alert.show("Se ingreso correctamente");
        setnewTypePermissionID(0);
        setnewTypePermissionName("");
        setnewTypePermissionDescription("");
      } else {
        alert.show("Ocurrio un error: " + response.status);
      }
    }
  };

  const getTypePermissionByIDRequest = async (ID) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_URL_GET_ByID, requestOptions);
    const data = await response.json();
    setnewTypePermissionID(data.tipo_Permiso_ID);
    setnewTypePermissionName(data.tipo_Permiso_Name);
    setnewTypePermissionDescription(data.tipo_Permiso_Description);
  };

  const InsertEvent = async () => {
    if (isModify) {
      if (newTypePermissionName == "") {
        alert.show("Por favor ingrese el nombre");
      } else {
        if (newTypePermissionID == 0) {
          alert.show("Ocurrio un error al cargar los datos...");
        } else {
          if (newTypePermissionDescription == "") {
            alert.show("Por favor ingrese la descripción...");
          } else {
            let obj = {
              Tipo_Permiso_ID: newTypePermissionID,
              Tipo_Permiso_Name: newTypePermissionName,
              Tipo_Permiso_Description: newTypePermissionDescription,
            };
            InsertRequest(obj);
          }
        }
      }
    } else {
      if (newTypePermissionName == "") {
        alert.show("Por favor ingrese el nombre");
      } else {
        if (newTypePermissionDescription == "") {
          alert.show("Por favor ingrese la descripción...");
        } else {
          let obj = {
            Tipo_Permiso_Name: newTypePermissionName,
            Tipo_Permiso_Description: newTypePermissionDescription,
          };
          InsertRequest(obj);
        }
      }
    }
  };

  useEffect(() => {
    if (objSelect != null) {
      setisModify(true);
      getTypePermissionByIDRequest(objSelect);
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
                      Nombre del tipo de permiso.
                    </InputGroup.Text>
                    <FormControl
                      aria-label="TypePermissionName"
                      value={newTypePermissionName}
                      type="text"
                      onChange={(event) =>
                        setnewTypePermissionName(event.target.value)
                      }
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      Descripcion del tipo de permiso.
                    </InputGroup.Text>
                    <FormControl
                      aria-label="TypePermissionDescription"
                      value={newTypePermissionDescription}
                      type="text"
                      onChange={(event) =>
                        setnewTypePermissionDescription(event.target.value)
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
