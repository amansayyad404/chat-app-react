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
    if(!user) return; //if we are blocked we cant do any thing we will return 

    const userDocRef=doc(db,"users",currentUser.id)

    try {
      await updateDoc(userDocRef,{ 
         //  arrayUnion->  It adds elements to an array field in a Firestore document if they are not already present. If the element is already in the array, it won’t be added again, preventing duplicates.
        blocked:isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
        // if user is blocked we are removing block by arrayRemove(user.id) and if we want to block we are blocking using arrayUnion(user.id),
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
            {/* when we signOut AuthStateChanged */}
           </div>


       
        
        
    </div>
    </>
  )
}

export default Detail
