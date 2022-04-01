const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

mongoose
    .connect(process.env.URL, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database')
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db