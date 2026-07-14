import api from "../../utils/axios"

const getcurrentuser = async () => {
    try {
        const { data } = await api.get("/me")
        console.log("User data:", data)
        return data
    } catch (error) {
        // This will print the exact message your backend sent back
        if (error.response) {
            console.error("Backend Error Data:", error.response.data);
            console.error("Backend Status Code:", error.response.status);
            return null
        } else {
            console.error("Axios Error:", error.message);
        }
    }
}

export default getcurrentuser