const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

const normalizeOrigin = (origin = "") => origin.trim().replace(/\/+$/, "")

const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
    .split(",")
    .map((origin) => normalizeOrigin(origin))
    .filter(Boolean)

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: (origin, callback) => {
        const requestOrigin = normalizeOrigin(origin || "")

        if (!origin || allowedOrigins.includes(requestOrigin)) {
            return callback(null, true)
        }

        return callback(new Error("Not allowed by CORS"))
    },
    credentials: true
}))

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app