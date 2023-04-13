import React, { useContext, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { AppContext } from '../context/appContext';

const Sidebar = () => {

  const user = useSelector((state)=>state.user);
  
  const { socket,currentRoom,setCurrentRoom,members,setMembers,
    privateMemberMsg,setPrivateMemberMsg,rooms,setRooms} = useContext(AppContext);

  useEffect(()=>{
    if(user){
      setCurrentRoom('general');
      getRooms();
      socket.emit('join-room','general');
      socket.emit('new-user');
    }

  },[]);
  socket.off('new-user').on('new-user',(payload)=>{
    setMembers(payload);
  });


  const getRooms =()=>{
    fetch('http://localhost:8000/rooms')
    .then((res)=>res.json())
    .then((data)=>setRooms(data))
  }

  if(!user){
    return(
      <></>
    )
  }
  return (
    <>
    <h2 className='mt-4'>Available Rooms</h2>
    <ListGroup>
        {rooms.map((room,idx)=>(
            <ListGroup.Item key={idx}>
                {room}
            </ListGroup.Item>
        ))}
    </ListGroup>
    <h2 className='mt-4'>Members</h2>
    <ListGroup>
    {members.map((m)=>(
      <ListGroup.Item key={m.id} style={{cursor:'pointer'}}>
          {m.name}
      </ListGroup.Item>
    ))}
    </ListGroup>
    </>
  )
}

export default Sidebar