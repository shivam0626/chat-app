import React,{ useState } from 'react'
import {Container,Form,Button, Row, Col} from "react-bootstrap";
import "./Login.css";
import {Link } from "react-router-dom";

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleLogin =(e)=>{
    e.preventDefault();

  }

  return (
    <Container>
      <Row>
        <Col md={5} className="login__bg"></Col>
        <Col md={7} className='d-flex flex-direction-column align-items-center justify-content-center'>
          <Form style={{width:"75%",maxWidth:500}} onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email} required />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} required  />
            </Form.Group>
            <Button variant="primary" type="submit">
             Login
            </Button>
            <div className='py-4'>
              <p className='text-center'>
                Don't Have an account ? <Link to='/signup'>Signup</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login