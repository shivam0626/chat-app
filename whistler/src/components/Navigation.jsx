import React from 'react';
import {Navbar, Nav,Container,NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import logo from '../assets/logo.png';

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg" >
    <Container>
      <LinkContainer to={'/'}>
        <Navbar.Brand className='d-flex flex-direction-row align-items-center justify-content-center'>
          <img src={logo} alt='logo' style={{height:50,width:50, borderRadius:10}} />
          <h2 style={{marginTop:"10px"}}>Whistler</h2>
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <LinkContainer to={'/login'}> 
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
          <LinkContainer to={'/chat'}> 
            <Nav.Link>Chat</Nav.Link>
          </LinkContainer>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Navigation;