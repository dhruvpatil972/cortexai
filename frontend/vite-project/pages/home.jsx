import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, googleProvider } from '../utils/firebase.js'
import api from '../utils/axios'
import { FcGoogle } from "react-icons/fc"

function Home() {
    // Removed the nested 'function App() {' that was blocking access

    const handlelogin = async (token) => {
        try {
            const { data } = await api.post('/auth/login', { token })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    };

    const googlelogin = async () => {
        try {
            const data = await signInWithPopup(auth, googleProvider)
            const token = await data.user.getIdToken()
            console.log(token)
            await handlelogin(token)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='h-screen flex bg-black text-amber-50 overflow-hidden'>
            <div className='fixed inset-20 z-100 flex items-center justify-center bg-bl backdrop-blur-sm bg-black/60'>

                <div className='w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-6'>

                    <div className='flex flex-col gap-1'>
                        <h2 className='text-[17px] font-semibold  text-slate-100 tracking-tight'> Welcome toCortexAI</h2>
                        <p className='text- [13px]text-slate-500'>Please login to continue using the app</p>
                    </div>
                    <button className='w-full flex items-center justify-center gap-4 pX-[20ex] rounded-4xl text-sm font-medium
                    text-black/90 bg-white  hover:bg-gray-200 transition-all duration-150 cursor-pointer' onClick={googlelogin}> 
                    <FcGoogle size={30} />
                    Continue With Google
                </button>
            </div>
        </div >
        </div >
    )
}

export default Home