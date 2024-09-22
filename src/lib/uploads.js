import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "./firebase";

const upload = async(file)=>{ //file means the avtar.file which is send from login page to set img 
    const date=new Date();

    const storageRef = ref(storage, `images/${date + file.name}`);//we upload img in storage in firebase 

    const uploadTask = uploadBytesResumable(storageRef, file);
    
    return new Promise((resolve,reject)=>{ //we will return ,which will recive in imgURL in login page in fun handelRegister

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        reject("something went wrong!" + error.code)
      }, 
      () => {
      
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL); 
        });
      }
      );
    });
    
};

export default upload
