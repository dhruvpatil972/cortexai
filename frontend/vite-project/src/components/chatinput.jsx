import { Paperclip, Mic, Send, MessagesSquare, FileText, Presentation, ImageIcon, Globe, Zap, Code2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import sendmessage from '../features/sendmessage'
import { addMessage } from '../redux/messagesslice'
import { createConversation } from '../features/createconversation'
import { addConversation, setConvTitle, setSelectedConversation } from '../redux/conversationslice'
import { updateConversation } from '../features/updateconversation'

function ChatInput() {
    const { selectedConversation } = useSelector((state) => state.conversation)
    const [selectedAgent, setSelectedAgent] = useState("auto")
    const dispatch = useDispatch()
    const [input, setInput] = React.useState('')


    const handleSendMessage = async () => {
        const trimmedInput = input.trim()
        if (!trimmedInput) return

        let conversation = selectedConversation

        if (!conversation?._id) {
            const conv = await createConversation()
            if (!conv?._id) return
            dispatch(addConversation(conv))
            dispatch(setSelectedConversation(conv))
            conversation = conv
        }

        if (conversation.title == "New Chat") {
            const conv = await updateConversation({ id: conversation?._id, title: trimmedInput })
            dispatch(setConvTitle({ conversationId: conversation._id, title: trimmedInput }))
        }

        const payload = {
            prompt: trimmedInput,
            conversationId: conversation._id,
            agent:selectedAgent.toLowerCase()
        }

        dispatch(addMessage({ role: 'user', content: trimmedInput }))
        setInput('')

        const data = await sendmessage(payload)

        if (data?.aiResponse) {
            dispatch(addMessage({ role: 'assistant', content: data?.aiResponse,images:data.images}))
            console.log(data)
        }
    }

    const agents = [
        {
            id: "auto",
            icon: Zap,
            label: "auto"
        },
        {
            id: "chat",
            icon: MessagesSquare,
            label: "chat"
        },
        {
            id: "coding",
            icon: Code2,
            label: "coding"
        },
        {
            id: "pdf",
            icon: FileText,
            label: "pdf"
        },
        {
            id: "ppt",
            icon: Presentation,
            label: "ppt"
        },
        {
            id: "image",
            icon: ImageIcon,
            label: "image"
        },
        {
            id: "search",
            icon: Globe,
            label: "search"
        },

    ]

    return (
        <div className="w-full overflow-hidden px-3 md:px-5 py-4 border-t border-white/6 bg-[#0d0f14]">
            <div className="flex flex-col gap-2 bg-white/3 border border-white/7 rounded-2xl px-4 pt-3.5 pb-3">

                <div className='flex w-[80%] gap-2 pr-2 flex-wrap'>
                    {agents.map((agent) => {
                        const isActive = selectedAgent === agent.label;
                        const Icon = agent.icon;
                        return (
                            <div
                                key={agent.label}
                                onClick={() => setSelectedAgent(agent.label)}
                                className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-all cursor-pointer
                     ${isActive
                                        ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-transparent shadow-[0_1px_8px_rgba(99,102,241,0.35)]"
                                        : "bg-white/[0.03] text-slate-400 border-white/[0.06] hover:bg-white/[0.07]"
                                    }`}
                            >
                                <Icon
                                    size={14}
                                    className={
                                        isActive
                                            ? "text-white"
                                            : "text-slate-500"
                                    }
                                />
                                {agent.label}
                            </div>
                        );
                    })}
                </div>




                <textarea
                    placeholder="Ask Anything..."
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    className="w-full bg-transparent outline-none resize-none text-[14px] text-slate-200 placeholder:text-slate-600 leading-relaxed scrollbar-none [&::-webkit-scrollbar]:hidden disabled:opacity-50"
                    rows={3}
                />
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/5 border border-transparent hover:border-white/6 transition-all duration-150 bg-transparent cursor-pointer"
                        >
                            <Paperclip size={16} />
                        </button>

                        <button
                            type="button"
                            className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/5 border border-transparent hover:border-white/6 transition-all duration-150 bg-transparent cursor-pointer"
                        >
                            <Mic size={16} />
                        </button>
                    </div>

                    <button
                        type="button"
                        disabled={!input.trim()}
                        onClick={handleSendMessage}
                        className={`flex items-center justify-center w-8 h-8 rounded-lg border-none cursor-pointer transition-all duration-150 ${input.trim()
                            ? 'bg-linear-to-br from-indigo-500 to-violet-700 hover:opacity-90'
                            : 'bg-gray-500 cursor-not-allowed'
                            }`}
                    >
                        <Send size={15} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatInput