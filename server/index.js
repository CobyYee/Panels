const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

dotenv.config()
const PORT = process.env.PORT || 4000
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB Atlas connection error: '))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))