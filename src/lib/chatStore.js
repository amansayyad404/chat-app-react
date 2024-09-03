import { doc,getDoc } from 'firebase/firestore';
import { create } from 'zustand'
import {db} from "./firebase"
import { useUserStore } from './userStore';


// *****we have created a state to store info ****************
export const useChatStore = create((set) => ({
  chatId:null,
  user:null,
  isCurrentUserBlocked:false,
  isReceiverBlocked:false,
  //we are getting data from handelSelect function 
changeChat:(chatId,user)=>{ //when we click on any chat in chat list we will get chat-id and user-info of that chat
  
    const currentUser =useUserStore.getState().currentUser //we are getting current-user from our user-store

    //check if current user is blocked 
    if(user.blocked.includes(currentUser.id)){
        return set({
            chatId,
             user:null,
             isCurrentUserBlocked:true,
             isReceiverBlocked:false,
        })
    }
   else if(currentUser.blocked.includes(user.id)){     //check if reciver user is blocked
        return set({
            chatId,
             user:user,
             isCurrentUserBlocked:false,
             isReceiverBlocked:true,
        })
    }else{                              //if both are not blocked then show this
          return  set({ 
         chatId,
         user,
         isCurrentUserBlocked:false,
         isReceiverBlocked:false,
    })
    }
},


changeBlock:()=>{ //if user is blocked then we will unblock and reverse!
    set((state)=>({...state, isReceiverBlocked: !state.isReceiverBlocked}))
},


}));