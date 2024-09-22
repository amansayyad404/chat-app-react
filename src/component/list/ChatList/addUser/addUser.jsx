import React, { useState } from 'react'
import "./addUser.css"
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../../../lib/firebase'
import { useUserStore } from '../../../../lib/userStore'
import { updateCurrentUser } from 'firebase/auth'
import ChatList from '../ChatList'



function addUser() {
const [user,setUser]=useState(null)
const {currentUser}=useUserStore()

// ------------------------------------------------------
//  searching user to add in ChatList
  const handelSearch =async(e)=>{
    e.preventDefault();
    const formData = new FormData(e.target) // Extracting form data
    const username =formData.get("username")

    try {
      
      const userRef =collection(db,"users"); // Reference to the "users" collection in Firestore

      const q=query(userRef,where("username","==",username)); // Creating a query to search for the user with the given username

      const querySnapShot =await getDocs(q);  // Executing the query and getting the results

      if(!querySnapShot.empty){  // If a matching user is found, update the state with that user's data
        setUser(querySnapShot.docs[0].data()) //data is set in useState
      }
      
    } catch (error) {
      console.log(error)
    }
  }
// ------------------------------------------------------

  const handelAdd =async()=>{ //when handelAdd is called we are storing data of current user and user which we chat with
    
    const chatRef =collection(db,"chats")// Get references to the 'chats' and 'userchats' collections in Firestore.
    const userChatsRef =collection(db,"userchats")

    try {
      const newChatRef=doc(chatRef)
      await setDoc(newChatRef,{
        createdAt:serverTimestamp(),
        messages:[], // Initializes an empty array to hold messages.
      });

      // Updates the document in "userchats" for the other user to include this new chat
      await updateDoc(doc(userChatsRef,user.id),{ 
        chats:arrayUnion({
          chatId:newChatRef.id,
          lastMessage:"",
          receiverId:currentUser.id,
          updatedAt:Date.now(),
        }),
      });

       // Updates the document in "userchats" for the current user to include this new chat
      await updateDoc(doc(userChatsRef,currentUser.id),{
        chats:arrayUnion({
          chatId:newChatRef.id,
          lastMessage:"",
          receiverId:user.id,
          updatedAt:Date.now(),
          
        }),
      });
    } catch (error) {
      console.log(error);
    }
    
  }
  return (


    <div className='addUser'>

      <form onSubmit={handelSearch} >
        <input type="text" placeholder='Username' name='username'/>
        <button>Search</button>
      </form>

      {/* if user is present then show this div , user is useState*/}
      {user && <div className="user">  

        <div className="detail">
          {/* if there is img-selected then selected that else select default-img  */}
            <img src={user.avatar||"./avatar.png"} alt="" />
            <span>{user.username}</span>
        </div>

        <button onClick={handelAdd}>Add User</button>

      </div>}


    </div>


  )
}

export default addUser
