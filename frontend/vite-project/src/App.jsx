import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth, googleProvider } from '../utils/firebase.js'
import api from '../utils/axios'
import Home from '../pages/home'
import getcurrentuser from './features/getcurrentuser.js'


function App() {
useEffect(() => {
  const getuser=async ()=>{
    await getcurrentuser()
  }
  getuser()

},[])


  return <> 
    <Home/>
    
  </>;
  
}

export default App
