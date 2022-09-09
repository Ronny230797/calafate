import React from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import "../../styles/admin/admin.scss";
import AppBarLogged from '../../components/appbar-logged.js';
import { PieChart } from '../charts/pie.js';
import { VerticalBar } from '../charts/verticalbar.js';
import { LineChart } from '../charts/line.js';
import { useState } from 'react';
import { useAlert } from "react-alert";


export default function MainChart() {

    const [isShown, setIsShown] = useState('');
    const alert = useAlert();

    const handleClick = (chart) => {
        // setIsShown(chart);
        alert.show(<div style={{ color: 'white' }}>Some Message</div>)
       
        
      };

    return (
        <React.Fragment>
            <Container className="admin">
                <AppBarLogged />
                <Row>
                    <Col xs={12} md={2}>
                        <Button onClick={()=>handleClick('Pie')}>Pie</Button>
                    </Col>
                    <Col xs={12} md={3}>
                        <Button onClick={()=>handleClick('BarVertical')}>Vertical Bar</Button>
                    </Col>
                    <Col xs={12} md={3}>
                        <Button onClick={()=>handleClick('Line')}>Line</Button>
                    </Col>
                </Row>

                <Row>
                    {isShown == 'Pie' && (
                        <Col xs={12} md={12}>
                            <PieChart />
                        </Col>
                    )}
                    {isShown == 'BarVertical' && (
                        <Col xs={12} md={12}>
                            <VerticalBar />
                        </Col>
                    )}
                    {isShown == 'Line' && (
                        <Col xs={12} md={12}>
                            <LineChart />
                        </Col>
                    )}
                </Row>
            </Container>
        </React.Fragment>
    );
}