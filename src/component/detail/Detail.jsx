import React from 'react'
import "./Detail.css"
function Detail() {
  return (
    <>
    <div className="detail">
        <div className="user">
          <img src="avatar.png" alt="" />
          <h2>luffy</h2>
          <p>hii iam luffy</p>
          <button>Block User</button>
        </div>

        <div className="logoutbtn">
          <button>Logout</button>
        </div>
        
        
    </div>
    </>
  )
}

export default Detail
