import * as React from 'react';
import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const ResponsiveAppBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg">
            <LinkContainer to="/">
                <Navbar.Brand>Calafate</Navbar.Brand>
            </LinkContainer>
            
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <LinkContainer to="/">
                        <Nav.Link >Home2</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/menu">
                        <Nav.Link >Menu</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/contact">
                        <Nav.Link >Contacto</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
export default ResponsiveAppBar;