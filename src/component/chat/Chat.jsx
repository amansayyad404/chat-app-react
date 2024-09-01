import React, { useEffect, useRef, useState } from 'react'
import "./chat.css"
import EmojiPicker from "emoji-picker-react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';
import upload from '../../lib/uploads';


function Chat() {
  const [chat,setChat] =  useState()


  const [open,setOpen] =  useState(false); //we have used this for emoji setting purpose
  const [text,setText] =  useState(""); //we have used this for text in chat purpose
  
  const [img,setImg]   =  useState({
      file:null,
      url:"",
      })


const {chatId,user, isCurrentUserBlocked,isReceiverBlocked}=useChatStore();
const {currentUser}=useUserStore();

// ********* when chat load it will go to bottom **************
const endRef =useRef(null);
useEffect(()=>{
  endRef.current?.scrollIntoView({behavior:"smooth"})
},[]);
// ------------------------------------------------------------------

useEffect(()=>{

  const unSub= onSnapshot(doc(db,"chats",chatId),(res)=>{
    setChat(res.data())
  })
return ()=>{
  unSub();
}
},[chatId])

// *********** emoji ***********************
const handleEmoji =e=>{
setText((prev) => prev + e.emoji) //when we will click on emoji it will place after text.
setOpen(false);
}
// ------------------------------------------------------------------


const handelImg =(e)=>{
  if(e.target.files[0]){
      setImg({
          file:e.target.files[0],
          url:URL.createObjectURL(e.target.files[0])
      });
  }
};

const handleSend = async ()=>{
  if(text === "") return;

  let imgUrl = null;

  try {

    if(img.file){
      imgUrl=await upload(img.file);
    }

    await updateDoc(doc(db,"chats",chatId),{
        messages:arrayUnion({
        senderId:currentUser.id,
        text,
        createdAt:new Date(),
        ...(imgUrl && { img : imgUrl }),
      }),
    });

    const userIDs =[currentUser.id,user.id];

    userIDs.forEach(async (id) => {

    const userChatsRef=doc(db,"userchats",id)
    const userChatsSnapshot =await getDoc(userChatsRef)
    if(userChatsSnapshot.exists()){
      const userChatsData=userChatsSnapshot.data()
      const chatIndex =userChatsData.chats.findIndex((c)=> c.chatId === chatId)

      userChatsData.chats[chatIndex].lastMessage =text;
      userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false
      userChatsData.chats[chatIndex].updatedAt =Date.now();

      await updateDoc(userChatsRef,{
        chats:userChatsData.chats,

      });
     }
    });
  } catch (error) {
    console.log(error);
  }

  setImg({
    file:null,
    url:""
  });
setText("");
};


  return (
    <div className='chat'>

      {/* <div className="top">
        <div className="user">
          <img src={user?.avatar ||"./avatar.png" }alt="" />
          <div className="texts">
            <span>{user?.username}</span>
            <p>hii iam luffy</p>
          </div>
        </div>
        
      </div> */}


      <div className="center">
        {chat?.messages?.map((message)=>(
           <div className={message.senderId === currentUser?.id ? "message own" : "message"} 
                  key={message?.createAt}>
                  <div className="texts">
                    {message.img && <img src={message.img}/>}
                    <p>{message.text}</p>
                    
                    {/* <span>{message.Date}</span> */}
                  </div>
             </div>

        ))}
 
       { img.url &&
        (<div className="message own">
          <div className="texts">
            <img src={img.url} alt="" />
          </div>
        </div>)}

        {/* //scrolling feature */}
        <div ref={endRef}></div>
        
      </div>

      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
          <img src="./img.png" alt="" />
          </label>
          
          <input type="file" id='file' style={{display:'none'}} onChange={handelImg} />
        </div>

        <input type="text" 
        placeholder={(isCurrentUserBlocked || isReceiverBlocked) ? "you cannot send a msg.. ":'type a msg...'} 
        value={text} 
        onChange={e=>setText(e.target.value)} //on change the value which is typed it will display because of setText
        disabled={isCurrentUserBlocked || isReceiverBlocked} />
       


        <div className="emoji">
          <img src="./emoji.PNG" alt="" className='emoji-icon' 
          onClick={()=>setOpen((prev)=>!prev)}/>
          <div className="picker">
          <EmojiPicker open={open} onEmojiClick={handleEmoji}></EmojiPicker>
          </div>
        </div>


        <button className='sendButton' 
        onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>
          Send
        </button>



      </div>
    </div>
  )
}

export default Chat
