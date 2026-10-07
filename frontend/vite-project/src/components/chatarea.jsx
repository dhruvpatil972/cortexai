import React, { useEffect } from 'react'
import Navbar from './navbar'
import Messagelist from './messagelist'
import Chatinput from './chatinput'
import { useDispatch, useSelector } from 'react-redux'
import getMessages from '../features/getMessages'
import { setMessages } from '../redux/messagesslice.js'

function chatarea() {
  const { selectedConversation } = useSelector((state) => state.conversation)
  const dispatch = useDispatch()

  useEffect(() => {
    const getmessages = async () => {
      
      if (!selectedConversation?._id || selectedConversation.title === "New Chat") return

      const data = await getMessages(selectedConversation._id)
      if (Array.isArray(data) && data.length > 0) {
        dispatch(setMessages(data))
      }
    }

    getmessages()
  }, [selectedConversation?._id, dispatch])

  return (
    <div className='flex-1 flex flex-col'>
      <Navbar />
      <Messagelist />
      <Chatinput />
    </div>
  )
}

export default chatarea