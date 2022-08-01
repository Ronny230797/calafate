import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/admin/admin.scss";
import "../../styles/admin/table-order.scss";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default function SalesCenter() {
  const n1 = 1;
  const n2 = 4;
  const n3 = 7;
  const API_URL_GET_ORDER =
    "http://localhost:4000/Administration/Admin/GetAllOrderActive";
  const [resData, setresData] = useState([]);
  const [dataExists, setdataExists] = useState(true);
  const [openBusy, setOpenBusy] = useState(false);
  const [openFree, setOpenFree] = useState(false);
  const [tableToPay, setTableToPay] = useState(0);

  const onOpenBusyModal = () => {
    setOpenBusy(true);
  };

  const onCloseBusyModal = () => {
    setOpenBusy(false);
  };

  const onOpenFreeModal = () => {
    setOpenFree(true);
  };

  const onCloseFreeModal = () => {
    setOpenFree(false);
  };

  const getOrderRequest = async () => {
    try {
      const response = await fetch(API_URL_GET_ORDER);
      const data = await response.json();
      console.log(data)
      await setresData(data);
    } catch (err) {
      setdataExists(false);
      alert("Ocurrio un error al cargar los datos... " + err);
    }
  };

  const ClickTable = async (i) => {
    await getOrderRequest();

    if (dataExists) {
      console.log(resData)


      if (resData.find(obj => obj.numero_Mesa == i)) {
        alert(`Mesa Ocupada`)
        let result = resData.filter(x => x.numero_Mesa == i);
        console.log(result[0])
        setTableToPay(result[0].order_ID);
        PayOrder();
      } else {
        alert(`Mesa Disponible`)
        setTableToPay(i);
        NewOrder();
      }

    } else {
      alert(`No data`)
    }



  }

  const NewOrder = () =>{
    setOpenFree(true);
  }

  const PayOrder = () => {
    setOpenBusy(true);

  }

  return (
    <React.Fragment>
      <Container className="admin">
        <Link to="/AllBillingOrder">
          <Button>Ver mesas activas</Button>
        </Link>
        <Modal open={openBusy} onClose={onCloseBusyModal}>
          <h2>Mesa Ocupada</h2>
          <p>
            La mesa se encuentra ocupada...
            <br />
            <Link to="/BillingByOrder" state={tableToPay}>
              <Button>Pagar</Button>
            </Link>
          </p>
        </Modal>
        <Modal open={openFree} onClose={onCloseFreeModal}>
          <h2>Mesa Disponible</h2>
          <p>
            La mesa se encuentra disponible...
            <br />
            <Link to="/" state={tableToPay}>
              <Button>Tomar Orden</Button>
            </Link>
          </p>
        </Modal>
        <Row>
          {
            Array.apply(null, { length: 3 }).map((e, i) => (
              <Col xs={12} md={4}>
                <div className="table-order" key={(n1 + i)} onClick={(e) => ClickTable((n1 + i))}>
                  <h1>Mesa</h1>
                  <h3>{(n1 + i)}</h3>
                </div>
              </Col>
            ))
          }
        </Row>
        <Row>
          {
            Array.apply(null, { length: 3 }).map((e, i) => (
              <Col xs={12} md={4}>
                <div className="table-order" key={(n2 + i)} onClick={(e) => ClickTable((n2 + i))}>
                  <h1>Mesa</h1>
                  <h3>{(n2 + i)}</h3>
                </div>
              </Col>
            ))
          }
        </Row>
        <Row>
          {
            Array.apply(null, { length: 3 }).map((e, i) => (
              <Col xs={12} md={4}>
                <div className="table-order" key={(n3 + i)} onClick={(e) => ClickTable((n3 + i))}>
                  <h1>Mesa</h1>
                  <h3>{(n3 + i)}</h3>
                </div>
              </Col>
            ))
          }
        </Row>
      </Container>
    </React.Fragment>
  );
}