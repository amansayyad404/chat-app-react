import React, { useState } from 'react'
import "./login.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword} from 'firebase/auth';
import { auth ,db} from '../../lib/firebase';
import { setDoc ,doc} from 'firebase/firestore';
import upload from '../../lib/uploads';


function Login() {

    //use-state for img
    const [avatar,setAvatar]=useState({
        file:null,
        url:""
    });
    
    const [loading,setLoading]=useState(false); //for showing loading Functionality

// **********************************************

    const handelAvatar =e=>{
        if(e.target.files[0]){ //if there is img then only set img
            setAvatar({
                file:e.target.files[0],//this means the selected img
                url:URL.createObjectURL(e.target.files[0]) //this selected img should be shown there Immediately
            });
        }
    };

// **********************************************

 const handelRegister =async (e)=>{
    e.preventDefault();
    setLoading(true);

    const formData =new FormData(e.target) //using this we can reach to Our user,email,password from our "form data"
    const {username,email,password} = Object.fromEntries(formData);
    
    try{
                                                    
        const res =await createUserWithEmailAndPassword(auth,email,password) //createUserWithEmailAndPassword is used so we can create new user by using email,pass

        const imgURL=await upload(avatar.file) //we call upload.js for uploading img


        await setDoc(doc(db,"users",res.user.uid),{ //(db,"users",res.user.uid)-> db means current db,"users" is the collection name,then uid is ->user-id which is created when user sign in
            username,                                   //id comes from res ,so we write "res.user.uid"
            email,
            avatar:imgURL,
            id:res.user.uid,
            blocked:[],
        });

        await setDoc(doc(db,"userchats",res.user.uid),{ //userchats are in chatList
                        //when we create new acc this fields are created
            chats:[] //it fetchs chat from chatList,in this empty array there will be details like seen lastmsg
        });

        toast.success(`Your account has been created, ${username}! You can now log in.`)

    }
    catch(err){
        console.log(err);
        toast.error(err.message)

    }
    finally{ //If successful Or error Setloading status to false
        setLoading(false);
    }
 }


 // **********************************************

 const handelLogin = async (e)=>{

    e.preventDefault();//This prevents the default behavior of the form submission. 
                        // Normally, submitting a form would reload the page, but this line stops that from happening 
                        // so you can handle the form submission with JavaScript.
   
    setLoading(true);   //This sets the loading state to true

    const formData =new FormData(e.target)
    const {email,password} = Object.fromEntries(formData);

    try {
        
        await signInWithEmailAndPassword(auth,email,password); //auth checks email-pass for login
    } catch (err) {
        console.log(err);
        toast.error(err.message);
        
    }
    finally{
        setLoading(false);
    }
 }

 // **********************************************



  return (
    <>
   
    <div className="login">
    
        <div className="item">
            <h2>Welcome back</h2>
            <img src="./welcome.png" alt="" className='welcome-img' />
            <form onSubmit={handelLogin} >
               
                <input type="text" placeholder='Email' name='email' />
                <input type="password" placeholder='Password' name='password' />

                <button disabled={loading}> {loading ? "Loading" : "Sign In"} </button>
                {/* when loading disabled the buttons  */}

            </form>
        </div>

         {/* -------------------------------------- */}
        <div className="separator"></div>
         {/* -------------------------------------- */}

        
        <div className="item">
            <h2>Create an Account </h2>
            <img src="boyLaptop.PNG" alt=""  className='boyLaptop'/>
            <form onSubmit={handelRegister} >

                {/* -------------------------------------- */}
                <label htmlFor="file">
                    {/* if there is img-selected then selected that else select default-img  */}
                    <img src={avatar.url || "./avatar.png"} alt="" /> 
                    Upoad an image
                </label>
                <input type="file" id='file' style={{display:"none"}} onChange={handelAvatar} />

                 {/* -------------------------------------- */}

                 <input type="text" placeholder='UserName' name='username' />
                <input type="text" placeholder='Email' name='email' />
                <input type="password" placeholder='Password' name='password' />
             
                <button disabled={loading}> {loading ? "Loading" : "Sign Up"} </button>
                
               
            </form>
        </div>
    </div>
    </>
  )
}

export default Login
