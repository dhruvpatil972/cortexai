import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth, googleProvider } from '../utils/firebase.js'
import api from '../utils/axios'
import Home from '../pages/home'
import getcurrentuser from './features/getcurrentuser.js'
import { useDispatch } from 'react-redux'
import { setUserdata } from './redux/userslice.js'


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const getuser = async () => {
      try {
        const data = await getcurrentuser()
        if (data) {
          dispatch(setUserdata(data))
        }
      } catch (error) {
        // Ignore unauthenticated startup state until login completes
      }
    }

    getuser()
  }, [dispatch])

  return <Home />
}

export default App
