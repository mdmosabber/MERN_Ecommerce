import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useCart } from '../../context/card';

const Menu = () => {
  const [cart] = useCart();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand> Ecommerce </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/"> Home </NavLink>
           
            <NavLink className="nav-link" to="/cart">
              Cart {cart.length > 0 && <span>({cart.length})</span>}
            </NavLink>

            <NavLink className="nav-link" to="/login"> Login </NavLink>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
