import React, { useContext, useState } from 'react'
import { Form, Row ,Col, Button } from 'react-bootstrap';
import "./MessageForm.css";
import {AppContext} from "../context/appContext";
import { useSelector } from "react-redux";

const MessageForm = () => {
    
    const [message,setMessage] = useState('');
    const {socket,currentRoom, setMessages, messages, privateMemberMsg } = useContext(AppContext);
    const user = useSelector((state)=>state.user);
    const getFormattedDate = () =>{
        const date = new Date();
        const year = date.getFullYear();
        let month = (1+date.getMonth()).toString();

        month = month.length > 1 ? month : '0' + month;
        let day = date.getDate().toString();

        day = day.length > 1 ? day : '0' + day; 

        return month + '/' + day + '/' + year;
    }

   let todayDate = getFormattedDate();

    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!message) return ;
        const today = new Date();
        const minutes = today.getMinutes() < 10 ? '0' +  today.getMinutes(): today.getMinutes();
        const time = today.getHours() + ":" + minutes;
        const roomId = currentRoom;
        socket.emit('message-room', roomId, message,user, time, todayDate);
        setMessage('');

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
                        <Form.Control type='text' placeholder='type your messsage...' disabled={!user} value={message} onChange={(e)=>setMessage(e.target.value)}></Form.Control>
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