const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema(
    {
        admin: { type: Boolean, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        username: { type: String, required: true },
        passwordHash: { type: String, required: true },
        email: { type: String, required: true },
        profilePicture: { type: ObjectId, required: false },
        follows: { type: [ObjectId], required: true },
        works: { type: [ObjectId], required: true },
        drafts: { type: [ObjectId], required: true },
        bookmarks: { type: [ObjectId], required: true },
        banned: { type: Boolean, required: true }
    }, 
    { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)