import api from '../../utils/axios'

async function getmessages(id) {
    try {
        const { data } = await api.get(`/chat/get-messages/${id}`)
        return data || []
    } catch (error) {
        console.error("Error fetching messages:", error.response?.data || error.message)
        return []
    }
}

export default getmessages