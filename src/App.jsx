
import List from './component/list/List'
import Chat from './component/chat/Chat'
import Detail from './component/detail/Detail'
import Login from './component/Login/Login'
import Notification from "./component/notification/notification"

function App() {
  
  const user =false;

  return (
   
      <div className='container'>
        {user ? (
          <>
                <Detail></Detail>
              <Chat></Chat>
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
