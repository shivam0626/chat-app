import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux';

const Sidebar = () => {

  const user = useSelector((state)=>state.user);
  const rooms = ['first room','second room','third room','fourth room'];
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
    </>
  )
}

export default Sidebar