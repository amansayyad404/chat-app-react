import React from 'react'
import "./List.css"
import UserInfo from "./userInfo/UserInfo.jsx"
import ChatList from "./ChatList/ChatList.jsx"
function List() {
  return (
    <>
     <div className='list'>
      <UserInfo></UserInfo>
      <ChatList></ChatList>
      </div>
    </>
   
  )
}

export default List
