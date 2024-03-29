import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const ResponsiveAppBar = () => {

    const removeLocalS = () =>{
        localStorage.removeItem('ABRLGN');
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg">
                <LinkContainer to="/WelcomeCenter">
                    <Navbar.Brand>Calafate</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <LinkContainer to="/UsersCenter">
                            <Nav.Link >Usuarios</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/DishesCenter">
                            <Nav.Link >Platos</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/SalesCenter">
                            <Nav.Link >Ordenes</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/mainchart">
                            <Nav.Link >Reporte</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/" onClick={removeLocalS}>
                            <Nav.Link >Salir</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        </>

    );
};
export default ResponsiveAppBar;