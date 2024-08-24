import React, { useState } from 'react'
import "./login.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth ,db} from '../../lib/firebase';
import { setDoc ,doc} from 'firebase/firestore';

function Login() {

    const [avatar,setAvatar]=useState({
        file:null,
        url:""
    })

    const handelAvatar =e=>{
        if(e.target.files[0]){
            setAvatar({
                file:e.target.files[0],
                url:URL.createObjectURL(e.target.files[0])
            })
        }
    }


 const handelRegister =async (e)=>{
    e.preventDefault();
    const formData =new FormData(e.target)
    const {username,email,password} = Object.fromEntries(formData);
    
    try{

        const res =await createUserWithEmailAndPassword(auth,email,password)

        await setDoc(doc(db,"users",res.user.uid),{
            username,
            email,
            id:res.user.uid,
            blocked:[],
        });
        await setDoc(doc(db,"userchats",res.user.uid),{
            chats:[]
        });
        toast.success(`Your account has been created, ${username}! You can now log in.`)
    }catch(err){
        console.log(err);
        
        toast.error(err.message)
    }
 }
 const handelLogin =e=>{
    e.preventDefault();
 }
  return (
    <>
    <div className="login">
    
        <div className="item">
           
            <h2>Welcome back</h2>
            <img src="./welcome.png" alt="" className='welcome-img' />
            <form onClick={handelLogin} >
                <input type="text" placeholder='Email' name='email' />
                <input type="password" placeholder='Password' name='password' />
                <button>Sign In</button>
            </form>
        </div>
        <div className="separator">
           
        </div>
        <div className="item">
            <h2>Create an Account</h2>
            <img src="boyLaptop.PNG" alt=""  className='boyLaptop'/>
            <form onSubmit={handelRegister} >
                <label htmlFor="file">
                    <img src={avatar.url || "./avatar.png"} alt="" />
                    Upoad an image
                </label>
                <input type="file" id='file' style={{display:"none"}} onChange={handelAvatar} />
                 <input type="text" placeholder='UserName' name='username' />
                <input type="text" placeholder='Email' name='email' />
                <input type="password" placeholder='Password' name='password' />
                <button>Sign Up</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default Login
