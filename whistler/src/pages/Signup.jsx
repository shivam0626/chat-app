import React, { useState } from 'react'
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./Signup.css";
import user from "../assets/user.png";
import { toast } from 'react-toastify';


const Signup = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');
  const [image,setImage] = useState(null);
  const [uploadingImg,setUploadingImg] = useState(false);
  const [imagePreview,setImagePreview] = useState(null);
 

  const validateImg =(e)=>{
    let file = e.target.files[0];
    if(file.size >= 1048576){
      return toast.error("Max file size is 1MB")
    }else{
      setImage(file);
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const uploadImage = async() =>{
    const data = new FormData();
    data.append('file',image);
    data.append('upload_preset','raj0626');
    try{
      setUploadingImg(true);
      let res = await fetch('https://api.cloudinary.com/v1_1/dpmwjg0e1/image/upload',{
        method:'post',
        body: data
      });
      const urlData = await res.json();
      setUploadingImg(false);
      toast.success("Credential Saved!");
      return urlData.url;
    }
    catch(err){
      setUploadingImg(false);
      toast.error("Something went wrong!")
      console.log(err);
    }
  }
  const handleSignup =async(e)=>{
    e.preventDefault();
    toast.info("Saving credentials");
    if(!image){
        return toast.warning("Please upload your profile picture!");
    }
    const url = await uploadImage(image);
    console.log(url);

    // signup the user
  }


  return (
    <Container>
    <Row>
      <Col md={7} className='d-flex flex-direction-column align-items-center justify-content-center'>
        <Form style={{width:"75%",maxWidth:500}} onSubmit={handleSignup}>
          <h1 className='text-center'>Create account</h1>
          <div className='signup-profile-pic__container'>
            <img src={imagePreview || user} alt='profile-pic' className='signup-profile-pic'/>
            <input type='file' id='image-upload' className='image__input' accept='image/png, image/jpeg' onChange={validateImg} />
          </div>
        <Form.Group className="mb-3 mt-3" controlId="formBasicName">
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
           {uploadingImg ? "Signing you up...":"Sign up"}
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