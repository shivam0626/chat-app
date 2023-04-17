import React, { useContext, useEffect, useRef, useState } from 'react'
import { Form, Row ,Col, Button } from 'react-bootstrap';
import "./MessageForm.css";
import {AppContext} from "../context/appContext";
import { useSelector } from "react-redux";

const MessageForm = () => {
    
    const [message,setMessage] = useState('');
    const {socket,currentRoom, setMessages, messages, privateMemberMsg } = useContext(AppContext);
    const user = useSelector((state)=>state.user);
    const messageEndRef = useRef(null);

    useEffect(()=>{
        scrollToBottom();
    },[messages]);

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

   socket.off('room-messages').on('room-messages',(roomMessages) =>{
    console.log('room-messages',roomMessages)
    setMessages(roomMessages)
   })

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

    const scrollToBottom =()=>{
        messageEndRef.current.scrollIntoView({behavior:"smooth"});
    }

  return (
    <div className="mt-2">
        <div className='message-output'>
            {user && !privateMemberMsg?._id && <div className='alert alert-info'>You are in the {currentRoom} room</div>}
            {user && privateMemberMsg?._id && (
                <>
                    <div className='alert alert-info conversation-info'>
                        <div>
                            Your conversation with {privateMemberMsg.name} 
                            <img src={privateMemberMsg.picture} className='conversation-profile-picture' alt='private-msg' />
                        </div>
                    </div>
                </>
            )}
            {!user && <div className='alert alert-danger'>Please login</div>}
                {user && 
                    messages.map(({_id: date,messagesByDate}, idx)=>(
                        <div key ={idx}>
                            <p className='alert alert-info text-center message-date-indicator'>{date}</p>
                            {messagesByDate?.map(({content,time,from:sender},msgIdx)=>(
                                <div className={sender?.email === user?.email ? "message" : "incoming-message" } key={msgIdx}>
                                    <div className='message-inner'>
                                        <div className='d-flex align-items-center mb-3'>
                                            <img src={sender.picture} style={{width:35, height:35,objectFit:'cover', borderRadius:'50%',marginRight:10}} alt='sender' />
                                            <p className='message-sender'>{sender._id === user?._id ? "You" : sender.name}</p>
                                        </div>
                                        <p className='message-content'>{content}</p>
                                        <p className='message-timestamp-left'>{time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                    <div ref={messageEndRef} />
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