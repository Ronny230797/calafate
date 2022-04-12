import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AllProduct() {
  const API_URL_GET_PRODUCT =
    "http://localhost:4000/Administration/Admin/GetAllProduct";
  const API_URL_DELETE_PRODUCT =
    "http://localhost:4000/Administration/Admin/DeleteProduct";
  const [resData, setresData] = useState([]);

  const [dataExists, setdataExists] = useState(true);
  const getProductRequest = async () => {
    try {
      const response = await fetch(API_URL_GET_PRODUCT);
      const data = await response.json();
      setresData(data);
    } catch (err) {
      alert("Ocurrio un error al cargar los datos... " + err);
      setdataExists(false);
    }
  };

  const deleteProduct = async (ID) => {
    console.log(ID);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ID),
    };
    const response = await fetch(API_URL_DELETE_PRODUCT, requestOptions);
    const data = await response.json();
  };

  useEffect(() => {
    getProductRequest();
  }, []);

  if (dataExists) {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <ListGroup>
                {resData.map((AllProduct) => (
                  <Row key={AllProduct.producto_ID}>
                    <Col xs={8} md={8}>
                      <ListGroup.Item>
                        {AllProduct.producto_Name}
                      </ListGroup.Item>
                    </Col>
                    <Col xs={4} md={4}>
                      <Link to="/InsertProduct" state={AllProduct.producto_ID}>
                        <Button>Modificar</Button>
                      </Link>
                      <Button
                        value={AllProduct.producto_ID}
                        onClick={(event) => deleteProduct(event.target.value)}
                      >
                        Eliminar
                      </Button>
                    </Col>
                  </Row>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col>
              <h1>No se encontraron datos ingresados para este apartado</h1>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
