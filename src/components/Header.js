import React, { useState } from "react";
import "../css/Header.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/images/logoDark.png";

export default function Header() {
  const [expanded, setExpanded] = useState(false);

  const handleFocus = () => { 
    setExpanded(true);
  };

  const handleBlur = () => {
    setExpanded(false);
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary navbar-dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              alt="AniHub"
              style={{ width: "130px", height: "auto" }}
            ></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="navbar-container">
              <Nav className={`me-auto ${expanded ? 'fade-out' : 'fade-in'} navbar-links text-white`}>
                <Nav.Link href="#link">Anime</Nav.Link>
                <Nav.Link href="#link">Manga</Nav.Link>
                  <NavDropdown title="Account" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">My Lists</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">Profile</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">Settings</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                  </NavDropdown>
              </Nav>
            <Form
              className={`ml-auto ${expanded ? 'expanded' : ''}`}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
