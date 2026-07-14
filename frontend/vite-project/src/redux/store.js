import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userslice'
import conversationReducer from './conversationslice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    conversation: conversationReducer,
  },
})