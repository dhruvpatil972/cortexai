import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
    name: "messages",
    initialState: {
        messages: []

    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        addMessage: (state, action) => {
            state.messages = [...state.messages, action.payload]
        }
    }
}
)
export const { setMessages, addMessage } = messagesSlice.actions
export default messagesSlice.reducer
