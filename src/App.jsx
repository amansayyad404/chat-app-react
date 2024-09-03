
import List from './component/list/List'
import Chat from './component/chat/Chat'
import Detail from './component/detail/Detail'
import Login from './component/Login/Login'
import Notification from "./component/notification/notification"
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useUserStore } from './lib/userStore' //is used to store user login-logout state
import { useChatStore } from './lib/chatStore'

function App() {
  
  const {currentUser,isLoading,fetchUserInfo}=useUserStore() //we are getting state and info of user
  const {chatId}=useChatStore() 




  
  useEffect(()=>{                 // detect whether a user is currently logged in or logged out
    const unSub =onAuthStateChanged(auth,(user)=>{ 
     
      fetchUserInfo(user?.uid);  //whenever AuthStateChanged ,and if user is present we will pass uid(user-id) to userStore.js
     
      // in logout case when we logout our onAuthStateChanged and user will be null 
      // and when we will try to fetchUserInfo of user there will be no user? so no uid,so we will get null              
   
    });

    return()=>{
      unSub();
    }
  },[fetchUserInfo]);


  //loading action is performed  when state change,we show loading-page 
  //we will see loading page until we get is user present or not
  if(isLoading) return <div className='loading'>Loading...</div>

  return (
   
      <div className='container'>
        {currentUser ? (  //if there is user we will call components else,we will call login page
          <>
       
         {/* we will see only that users info on which we have clicked ,
         because we are showing chat and detail based on chat-id which we clicked */}
         
               { chatId && <Detail></Detail>} 
               {chatId  && <Chat></Chat>}
              <List></List>
       
         {/* in staring we are seeing only chat list because we have not clicked on any chat 
              when we click then we get chat-id out that chat and based on that details and chats are rendered */}
         
         
          </>
        ):(
          <Login></Login>
        ) }
        <Notification></Notification> 

      </div>
     )
}

export default App
