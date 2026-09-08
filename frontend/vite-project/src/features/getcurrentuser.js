import api from "../../utils/axios"

const getcurrentuser = async () => {
    try {
        const { data } = await api.get("/me")
        console.log("User data:", data)
        return data
    } catch (error) {
        if (error.response) {
            // 401 simply means no active session found on startup
            if (error.response.status === 401) {
                return null
            }
            console.error("Backend Error Data:", error.response.data);
            console.error("Backend Status Code:", error.response.status);
            return null
        } else {
            console.error("Axios Error:", error.message);
        }
    }
}

export default getcurrentuser