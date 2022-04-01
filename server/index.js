const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

dotenv.config()
const PORT = process.env.PORT || 4000
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))
app.use(express.json({limit: '50mb'}))
app.use(cookieParser())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

const panelsRouter = require('./routes/panels-routers');
app.use('/api', panelsRouter)

const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB Atlas connection error: '))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))