import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userslice'
import conversationReducer from './conversationslice'
import messagesReducer from './messagesslice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    conversation: conversationReducer,
    messages: messagesReducer
  },
})