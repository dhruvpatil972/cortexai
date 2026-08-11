import React from 'react'
import api from '../../utils/axios'

async function getmessages(id) {
    try {
        const {data}=await api.get(`/chat/get-messages/${id}`)
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
        return []
 
        
    }



}


export default getmessages