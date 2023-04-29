import React, { useContext, useEffect } from 'react'
import { ListGroup, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../context/appContext';
import { toast } from 'react-toastify';
import { addNotifications, resetNotifications } from "../features/userSlice";
import "./Sidebar.css";


const Sidebar = () => {

  const user = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  
  const { socket,currentRoom,setCurrentRoom,members,setMembers,
    privateMemberMsg,setPrivateMemberMsg,rooms,setRooms} = useContext(AppContext);

  const joinRoom = (room,isPublic=true) => {
    if(!user){
      return toast.warning("Please login");
    }
    socket.emit("join-room",room,currentRoom);
    setCurrentRoom(room);
  
    if(isPublic){
      setPrivateMemberMsg(null)
    }
    // dispatch for notifications
    dispatch(resetNotifications(room));
  
  }

  socket.off('notifications').on('notifications',(room)=>{
    if(currentRoom !== room){
      dispatch(addNotifications(room));
    }
  })

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
    // rooms
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
                {room} {currentRoom !== room && <span className='badge rounded-pill bg-primary'>{user.newMessages[room]}</span>}
            </ListGroup.Item>
        ))}
    </ListGroup>
    <h2 className='mt-4'>Members</h2>
    <ListGroup>
    {members.map((member)=>(
      <ListGroup.Item key={member._id} style={{cursor:'pointer'}} active={privateMemberMsg?._id === member?._id} onClick={()=> handlePrivateMemberMsg(member)} disabled={member._id === user._id} >
         <Row>
          <Col xs={2} className='member-status'>
            <img src={member.picture} className='member-status-img' alt='user' />
            {member.status === 'online'? <i className='fas fa-circle sidebar-online-status'></i> : <i className="fas fa-circle sidebar-offline-status"></i>}
          </Col>
          <Col xs={9}>
            {member.name}
            {member._id === user?._id && " (You)"}
            {member.status === 'offline' && " (Offline)" }
          </Col>
          <Col xs={1}>
          <span className='badge rounded-pill bg-primary'>{user.newMessages[orderIds(member._id,user._id)]}</span>
          </Col>
         </Row>
      </ListGroup.Item>
    ))}
    </ListGroup>
    </>
  )
}

export default Sidebar