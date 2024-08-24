import React, { useState } from 'react'
import "./chatList.css"
function ChatList() {

  return (
    <>
    <div className='chatList'>
      {/* *** search **** */}
        <div className="search">


          <div className="searchbar">
            <img src="./search.png" alt="" />
            <input type="text" placeholder='Search' />
          </div>

 

        </div>
      {/* ***** */}
     
     <div className="item">
      <img src="./avatar.png" alt="" />
      <div className="texts">
        <span>aman s</span>
        <p>hii</p>
      </div>
     </div>
     <div className="item">
      <img src="./avatar.png" alt="" />
      <div className="texts">
        <span>aman s</span>
        <p>hii</p>
      </div>
     </div>
     <div className="item">
      <img src="./avatar.png" alt="" />
      <div className="texts">
        <span>aman s</span>
        <p>hii</p>
      </div>
     </div>
     <div className="item">
      <img src="./avatar.png" alt="" />
      <div className="texts">
        <span>aman s</span>
        <p>hii</p>
      </div>
     </div>
     <div className="item">
      <img src="./avatar.png" alt="" />
      <div className="texts">
        <span>aman s</span>
        <p>hii</p>
      </div>
     </div>
    </div>
    </>
  )
}

export default ChatList
