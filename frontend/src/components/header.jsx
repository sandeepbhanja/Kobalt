import React from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo_transparent.png";
import { LinkContainer } from "react-router-bootstrap";
import {useSelector} from 'react-redux';

const Header = () => {

  const {cartItems} = useSelector((state)=>state.cart);
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
                    {
                      cartItems.length > 0 && (
                        <Badge pill bg='success' className="mx-1">
                          {cartItems.reduce((a,c)=>a+c.qty,0)}
                        </Badge>
                      )
                    }
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
