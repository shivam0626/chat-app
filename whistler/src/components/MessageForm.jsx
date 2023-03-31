import React from 'react'
import { Form, Row ,Col, Button } from 'react-bootstrap';
import "./MessageForm.css";

const MessageForm = () => {

    const handleSubmit =(e)=>{
        e.preventDefault();
    }
  return (
    <div className="mt-2">
        <div className='message-output'></div>
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={10}>
                    <Form.Group>
                        <Form.Control type='text' placeholder='type your messsage...'></Form.Control>
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Button variant='primary' type='submit' style={{width:'100px',backgroundColor:"orange",border:'none'}}>
                        <i className='fas fa-paper-plane'></i>
                    </Button>
                </Col>
            </Row>
        </Form>
    </div>
  )
}

export default MessageForm