import React from 'react'
import { MessageSquare } from 'lucide-react'
import { useSelector } from 'react-redux'

function navbar() {

  const { selectedConversation } = useSelector(state => state.conversation)
  const { messages } = useSelector(state => state.messages)
  return (
    <>
    { selectedConversation &&  <div className='h-14 flex items-center gap-2.5 px-5 border-b border-white/[0.06] bg-[#0d0f14]'>
      < div className= 'flex items-center justify-center w-7 h-7 rounded-1g bg-indigo-500/10 border border-indigo-500/20'>
        <MessageSquare size={13} className="text-indigo-400"/>
      </div>
      < div className='text-[14px] font-semibold text-slate-100 tracking-tight'>
        {selectedConversation?.title || "New Chat"}
      </div>
      <div className='text-[10px] font-medium bg-white/[0.04] border border-white/[0.06] py-0.5 rounded-full'>
        {messages?.length} messages
      </div>
    </div>}
    </>
  )
}

     








export default navbar