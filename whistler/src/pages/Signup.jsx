import React, { useState } from 'react'
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./Signup.css";
import profile from "../assets/profile.png";

const Signup = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');
  const [image,setImage] = useState(null);
  const [uploadingImg,setUploadingImg] = useState(false);
  const [imagePreview,setImagePreview] = useState(null);

  const validateImg =(e)=>{
    const file = e.target.files[0];
    if(file.size >= 1048576){
      return alert("Max file size is 1mb")
    }else{
      setImage(file);
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const uploadImage = async() =>{
    const data = new FormData();
    data.append('flie',image);
    data.append('upload_preset','l7bcejcu')
  }
  const handleSignup =(e)=>{
    e.preventDefault();
    if(!image){
      return alert("Please upload your profile picture!");
    }
    const url = await uploadImage(image)
  }


  return (
    <Container>
    <Row>
      <Col md={7} className='d-flex flex-direction-column align-items-center justify-content-center'>
        <Form style={{width:"75%",maxWidth:500}} onSubmit={handleSignup}>
          <h1 className='text-center'>Create account</h1>
          <div className='signup-profile-pic__container'>
            <img src={imagePreview || profile} alt='profile-pic' className='signup-profile-pic'/>
            <label htmlFor="image-uplaod" className='image-upload-label'>
              <i className='fas fa-plus-circle add-picture-icon'></i>
            </label>
            <input type='file' id='image-upload' accept='image/png, image/jpeg' onChange={validateImg} />
          </div>
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" onChange={(e)=>setName(e.target.value)} value={name} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} />
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