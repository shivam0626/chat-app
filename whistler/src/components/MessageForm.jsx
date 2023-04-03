import React from 'react'
import { Form, Row ,Col, Button } from 'react-bootstrap';
import "./MessageForm.css";
import { useSelector } from "react-redux";

const MessageForm = () => {

    const user = useSelector((state)=>state.user);

    const handleSubmit =(e)=>{
        e.preventDefault();
    }
  return (
    <div className="mt-2">
        <div className='message-output'>
            {!user && <div className='alert alert-danger'>Please login</div>}
        </div>

        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={10}>
                    <Form.Group>
                        <Form.Control type='text' placeholder='type your messsage...' disabled={!user}></Form.Control>
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Button variant='primary' type='submit' style={{width:'100px',backgroundColor:"orange",border:'none'}} disabled={!user}>
                        <i className='fas fa-paper-plane'></i>
                    </Button>
                </Col>
            </Row>
        </Form>
    </div>
  )
}

export default MessageForm