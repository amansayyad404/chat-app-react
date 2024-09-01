
import List from './component/list/List'
import Chat from './component/chat/Chat'
import Detail from './component/detail/Detail'
import Login from './component/Login/Login'
import Notification from "./component/notification/notification"
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useUserStore } from './lib/userStore'
import { useChatStore } from './lib/chatStore'

function App() {
  
  const {currentUser,isLoading,fetchUserInfo}=useUserStore()
  const {chatId}=useChatStore()

  useEffect(()=>{
    const unSub =onAuthStateChanged(auth,(user)=>{
      fetchUserInfo(user?.uid);
    });

    return()=>{
      unSub();
    }
  },[fetchUserInfo]);

  if(isLoading) return <div className='loading'>Loading...</div>

  return (
   
      <div className='container'>
        {currentUser ? (  //if there is user we will call components else,we will call login page
          <>
               { chatId && <Detail></Detail>}
              {chatId && <Chat></Chat>}
              <List></List>
          </>
        ):(
          <Login></Login>
        ) }
        <Notification></Notification>

      </div>
     )
}

export default App
