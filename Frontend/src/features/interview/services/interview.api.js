import axios from "axios";

const normalizeApiBaseURL = (value = "") => value.trim().replace(/\/+$/, "").replace(/\/api$/, "")

const envApiBaseURL = normalizeApiBaseURL(import.meta.env.VITE_API_BASE_URL || "")
const apiBaseURL = envApiBaseURL || (import.meta.env.DEV ? "http://localhost:3000" : "")

if (import.meta.env.PROD && !envApiBaseURL) {
    console.warn("VITE_API_BASE_URL is not set. API calls will use same-origin URLs in production.")
}

const api = axios.create({
    baseURL: apiBaseURL,
    withCredentials: true,
})


/**
 * @description Service to generate interview report based on user self description, resume and job description.
 */
export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {

    const formData = new FormData()
    formData.append("jobDescription", jobDescription)
    formData.append("selfDescription", selfDescription)
    formData.append("resume", resumeFile)

    const response = await api.post("/api/interview/", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data

}


/**
 * @description Service to get interview report by interviewId.
 */
export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`)

    return response.data
}


/**
 * @description Service to get all interview reports of logged in user.
 */
export const getAllInterviewReports = async () => {
    const response = await api.get("/api/interview/")

    return response.data
}


/**
 * @description Service to generate resume pdf based on user self description, resume content and job description.
 */
export const generateResumePdf = async ({ interviewReportId }) => {
    const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`, null, {
        responseType: "blob"
    })

    return response.data
}