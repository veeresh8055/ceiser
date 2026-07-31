import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../utils/firebase.js'
import api from '../utils/axios.js'

import {FcGoogle } from 'react-icons/fc';



const Home = () => {
      const handleGoogleLogin = async ( token ) => {
          try{
                 const {data } = await api.post("/api/auth/login" , { token });
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
      //  <div className='flex justify-center items-center h-screen'>
      //       <button  className='px-4 py-2 bg-emerald-300 rounded cursor-pointer' onClick={googleLogin}>continue with google </button>
      //      </div>

      <div className='h-screen flex bg-[#0d0f14] text-white overflow-hidden'>
       <div className=' fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm '>
         <div className='w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5'>
         <div>

          <h2 className=' text-[17px] font-semibold text-slate-100 tracking-tight' >WELCOME TO CEISER AI </h2>
          <p className='text-[13px] text-slate-500'>Please login to continue using the App</p>
         </div>

         <button className=' w-full flex items-center justify-center gap-3 py-[11px] rounded-xl text-sm font-medium text-black/90 bg-white hover:bg-gray-200 transition-all duration-150 cursor-pointer ' onClick={googleLogin}> 
                   <FcGoogle size={15} />
                   Continue With Google
         </button>

         </div>
       </div>
      </div>
  )
}

export default Home
