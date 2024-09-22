import React, { useEffect, useState } from 'react'
import "./chatList.css"
import { useUserStore } from '../../../lib/userStore'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useChatStore } from '../../../lib/chatStore';
import AddUser from "./addUser/addUser";




function ChatList() {
  // ---------------------------
  //addMode and setAddMode is used for add and minus Functionality
  const [addMode,setAddMode]=useState(false);
  // ---------------------------


  const [chats,setChats] =useState([])

  //use to search users in search bar
  const [input,setInput] =useState("")

  const {chatId, changeChat}= useChatStore();
  const {currentUser} = useUserStore();
 


  // whenever we run this page this component automatic fetch data from userchats data and shows updated chats 
useEffect(()=>{

              // Setting up a real-time listener for a document in the "userchats" 
  const unSub =onSnapshot(doc(db,"userchats",currentUser.id), async(res)=>{

    const items =res.data().chats; //we are getting chats from "userchats"

    const promises= items.map(async(item)=>{
      const userDocRef =doc(db,"users",item.receiverId);
      const userDocSnap =await getDoc(userDocRef);

      const user=userDocSnap.data();

      return {...item,user};
    });
    const chatData =await Promise.all(promises)

    //chat acording to time updates
    setChats(chatData.sort((a,b)=>b.updatedAt -a.updatedAt))

  });
  return ()=>{
    unSub();
  };

},[currentUser.id])

// -----------------------------------------
const handleSelect =async (chat)=>{

 const userChats =chats.map(item=>{
  const {user, ...rest}=item;
  return rest;
 })

 const chatIndex =userChats.findIndex(item=>item.chatId === chat.chatId)

 userChats[chatIndex].isSeen=true;

 const userChatsRef=doc(db,"userchats",currentUser.id);

 try {
  await updateDoc(userChatsRef,{
    chats:userChats,
  });
  changeChat(chat.chatId,chat.user) //passing element to chatStore
 } catch (error) {
  console.log(err)
 }


}
//This filters the chats array to create a new array (filteredChats)
// that only includes chats where the username of the user matches the search input and shows result in chatList.
const filteredChats =chats.filter((c)=> 
  c.user.username.toLowerCase().includes(input.toLowerCase())
);

  return (
    <>
    <div className='chatList'>
      {/* *** search **** */}
        <div className="search">


          <div className="searchbar">
            <img src="./search.png" alt="" />
            <input type="text" placeholder='Search'
            onChange={(e)=>setInput(e.target.value)}
            />
            
           
          </div>
          <img src={addMode ?"./minus.png":"./plus.png"} 
          // when we click on add then setAddMode will be set to its Opposite
          //  and based on addMode it will chnage icons
          onClick={()=>setAddMode(prev=>!prev)}
          className='add'/>

        </div>


      {/* ----------------------------------------------*/}
     {filteredChats.map((chat)=>( //in chat there is data of that clicked chat 
     <div className="item" key={chat.chatId} 
     onClick={()=>handleSelect(chat)} //when we click on any chat handleSelect is called
     style={{
      backgroundColor:chat?.isSeen ? "transparent" :"#5183fe"
     }}
     >
      <img src={ chat.user.avatar  ||"./avatar.png" }alt="" />
      <div className="texts">
        <span>{chat.user.username}</span>
        <p>{chat.lastMessage}</p>
      </div>
     </div>
     ))}



     {/* // if addMode Is true, then AddUser will render, 
     and if it is false, then it will not render */}
     {addMode && <AddUser/>}
    </div>
    </>
  )
}

export default ChatList
