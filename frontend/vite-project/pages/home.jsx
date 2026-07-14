import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, googleProvider } from '../utils/firebase.js'
import api from '../utils/axios'
import { FcGoogle } from "react-icons/fc"
import { useDispatch, useSelector } from 'react-redux'
import { setUserdata } from '../src/redux/userslice.js'
import SideBar from '../src/components/sidebar'
import ChatArea from '../src/components/chatarea'
import Artifact from '../src/components/arficate'

function Home() {

    const { userData } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [collapsed, setCollapsed] = useState(false)
    // Removed the nested 'function App() {' that was blocking access

    const handlelogin = async (token) => {
        try {
            const { data } = await api.post('/auth/login', { token })
            dispatch(setUserdata(data))
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

            <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className='flex-1 min-w-0 flex overflow-hidden bg-[#090a0f] transition-all duration-150'>
                <ChatArea />
                <Artifact />
            </div>


            {!userData && <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm'>

                <div className='w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-6'>

                    <div className='flex flex-col gap-1'>
                        <h2 className='text-[17px] font-semibold  text-slate-100 tracking-tight'> Welcome to CortexAI</h2>
                        <p className='text-[13px] text-slate-500'>Please login to continue using the app</p>
                    </div>
                    <button className='w-full flex items-center justify-center gap-4 px-[20px] rounded-4xl text-sm font-medium
                    text-black/90 bg-white  hover:bg-gray-200 transition-all duration-150 cursor-pointer' onClick={googlelogin}>
                    <FcGoogle size={30} />
                    Continue With Google
                </button>
            </div>
        </div >}            

           
        </div >
    )
}

export default Home
