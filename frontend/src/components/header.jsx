import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo_transparent.png";
import { LinkContainer } from "react-router-bootstrap";
const Header = () => {
  return (
    <header>
      <LinkContainer to="/">
        <Navbar bg="dark" variant="dark" expands="md" collapseOnSelect>
          <Container>
            <Navbar.Brand href="/">
              <img width="60" height="60" src={logo} alt="Kobalt" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <FaShoppingCart />
                    Cart
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/sign-in">
                  <Nav.Link>
                    <FaUser />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </LinkContainer>
    </header>
  );
};

export default Header;
