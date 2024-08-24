import React, { useEffect, useRef, useState } from 'react'
import "./chat.css"
import EmojiPicker from "emoji-picker-react";


function Chat() {
const [open,setOpen]=useState(false);
const [text,setText]=useState("");

// when chat load it will go to bottom 
const endRef =useRef(null);
useEffect(()=>{
  endRef.current?.scrollIntoView({behavior:"smooth"})
},[]);

const handleEmoji =e=>{
setText((prev) => prev + e.emoji) //after text emoji
setOpen(false);
}

  return (
    <div className='chat'>

      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>luffy</span>
            <p>hii iam luffy</p>
          </div>
        </div>

        
      </div>
      <div className="center">
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit  Similique ratione facilis nam, totam modi commodi cumque temporibus ipsum aliquid.  sunt.</p>
            <span>1m ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>Lorem ipsum dolor sit  Similique ratione facilis nam, totam modi commodi cumque temporibus ipsum aliquid.  sunt.</p>
            <span>1m ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit  Similique ratione facilis nam, totam modi commodi cumque temporibus ipsum aliquid.  sunt.</p>
            <span>1m ago</span>
          </div>
        </div>
        <div className="message own">
          
          <div className="texts">
            <p>Lorem ipsum dolor sit  Similique ratione facilis nam, totam modi commodi cumque temporibus ipsum aliquid.  sunt.</p>
            <span>1m ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit  Similique ratione facilis nam, totam modi commodi cumque temporibus ipsum aliquid.  sunt.</p>
            <span>1m ago</span>
          </div>
        </div>
        <div className="message own">
         
          <div className="texts">
          <img src="./bg.png" alt="" />
            <p>Lorem ipsum dolor sit  Similique ratione facilis nam, totam modi commodi cumque temporibus ipsum aliquid.  sunt.</p>
            <span>1m ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
          <img src="./bg.png" alt="" />
            <p>Lorem ipsum dolor sit  Similique ratione facilis nam, totam modi commodi cumque temporibus ipsum aliquid.  sunt.</p>
            <span>1m ago</span>
          </div>
        </div>

        {/* //scrolling feature */}
        <div ref={endRef}></div>
        
      </div>

      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
        </div>
        <input type="text" placeholder='type a msg...' value={text} onChange={e=>setText(e.target.value)} />
       
        <div className="emoji">
          <img src="./emoji.PNG" alt="" className='emoji-icon' 
          onClick={()=>setOpen((prev)=>!prev)}/>
          <div className="picker">
          <EmojiPicker open={open} onEmojiClick={handleEmoji}></EmojiPicker>
          </div>
          
        </div>
        <button className='sendButton'>
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat
