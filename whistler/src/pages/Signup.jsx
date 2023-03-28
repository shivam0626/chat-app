import React from 'react'
import {Container,Form,Button, Row, Col} from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./Signup.css";
import profile from "../assets/profile.png";

function validateImg(){
  
}

const Signup = () => {
  return (
    <Container>
    <Row>
      <Col md={7} className='d-flex flex-direction-column align-items-center justify-content-center'>
        <Form style={{width:"75%",maxWidth:500}}>
          <h1 className='text-center'>Create account</h1>
          <div className='signup-profile-pic__container'>
            <img src={profile} alt='profile-pic' className='signup-profile-pic'/>
            <label htmlFor="image-uplaod" className='image-upload-label'>
              <i className='fas fa-plus-circle add-picture-icon'></i>
            </label>
            <input type='file' id='image-upload' hidden accept='image/png, image/jpeg' onChange={validateImg} />
          </div>
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
           Create Account
          </Button>
          <div className='py-4'>
              <p className='text-center'>
                Already Have an account ? <Link to='/login'>Login</Link>
              </p>
            </div>
        </Form>
      </Col>
      <Col md={5} className="signup__bg"></Col>
    </Row>
  </Container>
  )
}

export default Signup