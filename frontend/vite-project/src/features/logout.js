import React from 'react'
import api from '../../utils/axios'

async function logout() {
    try {
        const { data } = await api.get("/auth/logout")
        console.log(data)
    }
    catch (error) {
        console.log(error)

    }

}

export default logout