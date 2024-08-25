import React from 'react'
import "./Detail.css"
import { auth, db } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
function Detail() {

  const {chatId, user, isCurrentUserBlocked,isReceiverBlocked,changeBlock} =
  useChatStore();
  const {currentUser}=useUserStore();

  const handelBlock= async()=>{
    if(!user) return;

    const userDocRef=doc(db,"users",currentUser.id)

    try {
      await updateDoc(userDocRef,{
        blocked:isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <div className="detail">
        <div className="user">
          <img className='detail-img' src={user?.avatar  ||"avatar.png" }alt="" />
          <h2>{user?.username}</h2>
          <p>hii iam {user?.username}</p>


          <button onClick={handelBlock}>{
            //text when user is blocked
            isCurrentUserBlocked ? "You are Blocked" : isReceiverBlocked ? "User Blocked" :"Block User"
            
            }
          </button>

        </div>

        <div className="logoutbtn">
            <button onClick={()=>auth.signOut()}>Logout</button>
           </div>


       
        
        
    </div>
    </>
  )
}

export default Detail
