import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = ({ isAdmin, isLoggedIn }) => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Shop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto float-right flex">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/user/signup">
                <Nav.Link>
                  <i className="fas fa-user"></i>
                  {isLoggedIn ? "Sign out" : "Sign In"}
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/user/my/orders">
                <Nav.Link>
                  <i className="fas fa-user"></i>My Orders
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to={isAdmin ? "/admin" : ""}>
                <Nav.Link>
                  <i className="fas fa-user"></i>
                  {isAdmin ? "Admin" : ""}
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
