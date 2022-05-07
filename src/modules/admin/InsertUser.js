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
  Form
} from "react-bootstrap";
import "../../styles/admin/InsertDish.scss";

export default function InsertUser() {
  const API_URL = "http://localhost:4000/Administration/Admin/InsertUser";
  const API_URL_Modify =
    "http://localhost:4000/Administration/Admin/ModifyUser";
  const API_URL_GET_Type =
    "http://localhost:4000/Administration/Admin/GetAllUserType";
  const API_URL_GET_ByID =
    "http://localhost:4000/Administration/Admin/GetAllUserByID";

  const [resData, setresData] = useState([]);
  const [newUsuarioID, setnewUsuarioID] = useState(0);
  const [newTypeUserUser, setnewTypeUserUser] = useState(0);
  const [newFirstname, setnewFirstname] = useState("");
  const [newSecondname, setnewSecondname] = useState("");
  const [newFirtLastname, setnewFirtLastname] = useState("");
  const [newSecondLastname, setnewSecondLastname] = useState("");
  const [newUsername, setnewUsername] = useState("");
  const [newUserPassWord, setnewUserPassWord] = useState("");
  const [newUserPassWordValidate, setnewUserPassWordValidate] = useState("");
  const [restypeUserData, setrestypeUserData] = useState([]);
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
      console.log(response.status);
      if (response.status == 200) {
        alert("Se ingreso correctamente");
        setnewFirstname("");
        setnewSecondname("");
        setnewFirtLastname("");
        setnewSecondLastname("");
        setnewUserPassWord("");
        setnewUserPassWordValidate("");
        setnewUsername("");
        setnewTypeUserUser(0);
      } else {
        alert("Ocurrio un error: " + response.status);
      }
    }
  };

  const getTypeUserRequest = async () => {
    const response = await fetch(API_URL_GET_Type);
    const data = await response.json();
    setrestypeUserData(data);
  };

  const getUserByIDRequest = async (ID) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_URL_GET_ByID, requestOptions);
    const data = await response.json();
    console.log(data);
    setnewUsuarioID(data.usuario_ID);
    setnewTypeUserUser(data.fK_Tipo_Usuario_Usuario);
    setnewFirstname(data.firstName);
    setnewSecondname(data.usuario_Second_Name);
    setnewFirtLastname(data.usuario_First_Last_Name);
    setnewSecondLastname(data.usuario_Second_Last_Name);
    setnewUsername(data.usuario_Username);
    setnewUserPassWord(data.usuario_Password);
    setnewUserPassWordValidate(data.usuario_Password);
  };

  const InsertEvent = async () => {
    if (isModify) {
      if (newUsuarioID === 0) {
        alert("Ocurrio un error al cargar los datos.");
      } else {
        if (newFirstname === "") {
          alert("Ingrese el nombre por favor.");
        } else {
          if (newFirtLastname === "") {
            alert("Ingrese el primer apellido.");
          } else {
            if (newSecondLastname === "") {
              alert("Ingrese el segundo apellido");
            } else {
              if (newUsername === "") {
                alert("Ingrese el nombre de usuario.");
              } else {
                if (newTypeUserUser === 0) {
                  alert("Ingrese el tipo de usuario.");
                } else {
                  if (newUserPassWord.trim() === "") {
                    alert("Ingrese la contraseña.");
                  } else {
                    if (newUserPassWord !== newUserPassWordValidate) {
                      alert("Las dos contraseñas deben ser iguales.");
                    } else {
                      let obj = {
                        usuario_ID: newUsuarioID,
                        fK_Tipo_Usuario_Usuario: newTypeUserUser,
                        firstName: newFirstname,
                        usuario_Second_Name: newSecondname,
                        usuario_First_Last_Name: newFirtLastname,
                        usuario_Second_Last_Name: newSecondLastname,
                        usuario_Username: newUsername,
                        usuario_Password: newUserPassWord,
                      };
                      InsertRequest(obj);
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      if (newFirstname === "") {
        alert("Ingrese el nombre por favor.");
      } else {
        if (newFirtLastname === "") {
          alert("Ingrese el primer apellido.");
        } else {
          if (newSecondLastname === "") {
            alert("Ingrese el segundo apellido");
          } else {
            if (newUsername === "") {
              alert("Ingrese el nombre de usuario.");
            } else {
              if (newTypeUserUser === 0) {
                alert("Ingrese el tipo de usuario.");
              } else {
                if (newUserPassWord.trim() === "") {
                  alert("Ingrese la contraseña.");
                } else {
                  if (newUserPassWord !== newUserPassWordValidate) {
                    alert("Las dos contraseñas deben ser iguales.");
                  } else {
                    let obj = {
                      fK_Tipo_Usuario_Usuario: newTypeUserUser,
                      firstName: newFirstname,
                      usuario_Second_Name: newSecondname,
                      usuario_First_Last_Name: newFirtLastname,
                      usuario_Second_Last_Name: newSecondLastname,
                      usuario_Username: newUsername,
                      usuario_Password: newUserPassWord,
                    };
                    console.log(obj);
                    InsertRequest(obj);
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    console.log(objSelect);
    if (objSelect != null) {
      setisModify(true);
      getUserByIDRequest(objSelect);
      getTypeUserRequest();
    } else {
      setisModify(false);
      getTypeUserRequest();
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
                  <Form.Label>Ingrese el tipo de usuario que desea ingresar.</Form.Label>
                  <FormSelect
                    onChange={(event) => setnewTypeUserUser(event.target.value)}
                    aria-label="Tipo de platillo"
                  >
                    <option value={0}>Seleccione el tipo usuario</option>
                    {restypeUserData.map((TypeUser) => (
                      <option
                        key={TypeUser.tipo_Usuario_ID}
                        value={TypeUser.tipo_Usuario_ID}
                      >
                        {TypeUser.tipo_Usuario_Name}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Primer nombre</InputGroup.Text>
                    <FormControl
                      aria-label="Firstname"
                      value={newFirstname}
                      type="text"
                      onChange={(event) => setnewFirstname(event.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Segundo nombre</InputGroup.Text>
                    <FormControl
                      aria-label="Secondname"
                      value={newSecondname}
                      type="text"
                      onChange={(event) => setnewSecondname(event.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Primer apellido</InputGroup.Text>
                    <FormControl
                      aria-label="FirstLastname"
                      value={newFirtLastname}
                      type="text"
                      onChange={(event) =>
                        setnewFirtLastname(event.target.value)
                      }
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Segundo apellido</InputGroup.Text>
                    <FormControl
                      aria-label="SecondLastname"
                      value={newSecondLastname}
                      type="text"
                      onChange={(event) =>
                        setnewSecondLastname(event.target.value)
                      }
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Nombre de usuario</InputGroup.Text>
                    <FormControl
                      aria-label="username"
                      value={newUsername}
                      type="text"
                      onChange={(event) => setnewUsername(event.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Contraseña</InputGroup.Text>
                    <FormControl
                      aria-label="userPassword"
                      value={newUserPassWord}
                      type="password"
                      onChange={(event) =>
                        setnewUserPassWord(event.target.value)
                      }
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={10} md={10}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      Vuelva a ingresar la contraseña
                    </InputGroup.Text>
                    <FormControl
                      aria-label="userPasswordValidate"
                      value={newUserPassWordValidate}
                      type="password"
                      onChange={(event) =>
                        setnewUserPassWordValidate(event.target.value)
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
