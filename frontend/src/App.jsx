import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, googleProvider } from '../utils/firebase.js'
import api from '../utils/axios.js';

function App() {
    const handleGoogleLogin = async ( token ) => {
      try{
             const {data } = await api.post("/auth/login" , { token });
             console.log(data)
      } catch (error) {
            console.error('Error during Google login:', error);
        }
    }

  const googleLogin = async ()=>{
    const data  = await signInWithPopup(auth, googleProvider)
    const token = await data.user.getIdToken();
    console.log("token -->" + token)
    await handleGoogleLogin(token);
    console.log(data)
  
  }
  return (
           <div className='flex justify-center items-center h-screen'>
            <button  className='px-4 py-2 bg-emerald-300 rounded cursor-pointer' onClick={googleLogin}>continue with google </button>
           </div>
  )
}

export default App
