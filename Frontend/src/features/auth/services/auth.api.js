import axios from "axios"

const normalizeApiBaseURL = (value = "") => value.trim().replace(/\/+$/, "").replace(/\/api$/, "")

const envApiBaseURL = normalizeApiBaseURL(import.meta.env.VITE_API_BASE_URL || "")
const apiBaseURL = envApiBaseURL || (import.meta.env.DEV ? "http://localhost:5000" : "")

if (import.meta.env.PROD && !envApiBaseURL) {
    console.warn("VITE_API_BASE_URL is not set. API calls will use same-origin URLs in production.")
}

const api = axios.create({
    baseURL: apiBaseURL,
    withCredentials: true
})

export async function register({ username, email, password }) {

    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        return response.data

    } catch (err) {

        console.log(err)

    }

}

export async function login({ email, password }) {

    try {

        const response = await api.post("/api/auth/login", {
            email, password
        })

        return response.data

    } catch (err) {
        console.log(err)
    }

}

export async function logout() {
    try {

        const response = await api.get("/api/auth/logout")

        return response.data

    } catch (err) {

    }
}

export async function getMe() {

    try {

        const response = await api.get("/api/auth/get-me")

        return response.data

    } catch (err) {
        if (err?.response?.status === 401) {
            return null
        }

        throw err
    }

}