import React from 'react'
import Navbar from './navbar'
import Messagelist from './messagelist'
import Chatinput from './chatinput'
import { useDispatch, useSelector } from 'react-redux' 
import getMessages from '../features/getMessages' 
import { setMessages } from '../redux/messageSlice'

function chatarea() {
  const { selectedConversation } = useSelector(state => state.conversation)
  const dispatch =useDispatch()
  useEffect(() => {
    const getmessages =async () => {
      if(selectedConversation)
      const data=await getmessages(selectedConversation?._id )
    dispatch(setMessages(data))
    }
  getmessages()
  },[selectedConversation])
  return (
    <div className='flex-1 flex flex-col'>
      <navbar />
      <messagelist />
      <chatinput />
      
    </div>
  )
}

export default chatarea