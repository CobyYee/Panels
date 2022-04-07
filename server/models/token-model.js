const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const TokenSchema = new Schema({
    userId: { type: ObjectId, required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 }
})

module.exports = mongoose.model('Token', TokenSchema)