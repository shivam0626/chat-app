
import React from 'react';
import {Navbar, Nav,Container,NavDropdown, Button} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {useLogoutUserMutation} from "../services/appApi";
import logo from '../assets/logo.png';

const Navigation = () => {
  const user = useSelector((state)=>state.user);

  const[logoutUser] = useLogoutUserMutation();

  const handleLogout =async(e)=> {
    e.preventDefault();
    await logoutUser(user);
    window.location.replace("/");
  }

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
          { !user &&
          <LinkContainer to={'/login'}> 
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
          }
          <LinkContainer to={'/chat'}> 
            <Nav.Link>Chat</Nav.Link>
          </LinkContainer>
          { user &&
          <NavDropdown title={
            <>
            <img src={user.picture} style={{width:30,height:30,marginRight:10,objectFit:'cover',borderRadius:'50%'}} />
            {user.name}
            </>
          } id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.4">
             <Button variant="danger" size={'sm'} onClick={handleLogout}>
                Logout
             </Button>
            </NavDropdown.Item>
          </NavDropdown>
          }
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Navigation;