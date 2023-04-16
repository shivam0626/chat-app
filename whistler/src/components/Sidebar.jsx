import React, { useContext, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { AppContext } from '../context/appContext';
import { toast } from 'react-toastify';


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

  const orderIds = (id1,id2) =>{
    if(id1 > id2){
      return id1 + '-' + id2;
    }
    else{
      return id2 +'-' + id1;
    }
  }

  const handlePrivateMemberMsg = (member) =>{
      setPrivateMemberMsg(member);
      const roomId = orderIds(user._id,member._id);
      joinRoom(roomId,false);
  }

  const joinRoom = (room,isPublic=true) => {
    if(!user){
      return toast.warning("Please login");
    }
    socket.emit("join-room",room);
    setCurrentRoom(room);

    if(isPublic){
      setPrivateMemberMsg(null)
    }
    // dispatch for notifications
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
            <ListGroup.Item key={idx} active={room === currentRoom} onClick={()=>joinRoom(room)} style={{cursor:"pointer", display:'flex', justifyContent:'space-between'}}>
                {room} {currentRoom !== room && <span></span>}
            </ListGroup.Item>
        ))}
    </ListGroup>
    <h2 className='mt-4'>Members</h2>
    <ListGroup>
    {members.map((member)=>(
      <ListGroup.Item key={member.id} style={{cursor:'pointer'}} active={privateMemberMsg?._id === member?._id} onClick={()=> handlePrivateMemberMsg(member)} disabled={member._id === user._id} >
          {member.name}
      </ListGroup.Item>
    ))}
    </ListGroup>
    </>
  )
}

export default Sidebar