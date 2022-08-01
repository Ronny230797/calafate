import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/admin/admin.scss";
import "../../styles/admin/table-order.scss"

export default function SalesCenter() {
  const n1 = 1;
  const n2 = 4;
  const n3 = 7;


  const ClickTable = (i) => {
    alert(`Mesa ${i}`)
  }

  return (
    <React.Fragment>
      <Container className="admin">
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