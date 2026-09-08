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
      if (!selectedConversation?._id) return

      const data = await getMessages(selectedConversation._id)
      dispatch(setMessages(data))
    }

    getmessages()
  }, [selectedConversation, dispatch])

  return (
    <div className='flex-1 flex flex-col'>
      <Navbar />
      <Messagelist />
      <Chatinput />
    </div>
  )
}

export default chatarea