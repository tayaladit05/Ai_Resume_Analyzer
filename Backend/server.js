require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")

const PORT = process.env.PORT || 5000

if (!process.env.MONGO_URI || !process.env.JWT_SECRET || !process.env.GOOGLE_GENAI_API_KEY) {
    console.error("Missing required environment variables. Please set MONGO_URI, JWT_SECRET and GOOGLE_GENAI_API_KEY.")
    process.exit(1)
}

if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1)
}

connectToDB()


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})