import { doc,getDoc } from 'firebase/firestore';
import { create } from 'zustand' // It's used to "manage" and "store" the state of an application, including user state,
import {db} from "./firebase"


//-----we have created a state to store info of our user weather it is login or logout----------
export const useUserStore = create((set) => ({
  currentUser:null,
  isLoading:true,

    fetchUserInfo: async(uid)=>{ //we are getting user-id from "app.jsx" and update our state

        if(!uid) return set({currentUser:null, isLoading:false}) //if there is no uid means we are logged out "set({currentUser:null, isLoading:false}"

            try {
                
                const docRef=doc(db,"users",uid);
                const docSnap=await getDoc(docRef);

                if(docSnap.exists()){
                    set({currentUser:docSnap.data(), isLoading:false}) // if our uid is their then we will get our profile
                }else{
                    set({currentUser:null, isLoading:false}) //else set uid null
                }

            } catch (error) {
                console.log(error);

                return set({currentUser:null, isLoading:false}) //if error means we are still logged-out
            }

    }
}))