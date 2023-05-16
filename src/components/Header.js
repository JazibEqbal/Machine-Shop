import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = ({ isAdmin, isLoggedIn }) => {
  const navigate = useNavigate();

  const logOut = () => {};
  const checkLogIn = () => {
    if (isLoggedIn) {
      logOut();
      navigate();
    } else {
      navigate("/user/signup");
    }
  };
  //console.log(isLoggedIn);
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
              <LinkContainer to="/">
                <Nav.Link>
                  <i></i>Home
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/user/my/orders">
                <Nav.Link>
                  <i className="fas fa-user"></i>My Orders
                </Nav.Link>
              </LinkContainer>
              <Nav.Item>
                <button
                  className={`${styles.signupbutton} btn`}
                  type="button"
                  onClick={checkLogIn}
                >
                  {isLoggedIn ? "Sign Out" : "Sign In"}
                </button>
              </Nav.Item>
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
