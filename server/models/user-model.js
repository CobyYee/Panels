const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        admin: { type: Boolean, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        username: { type: String, required: true },
        passwordHash: { type: String, required: true },
        email: { type: String, required: true },
        profilePicture: { type: Image, required: false },
        follows: { type: [ObjectId], required: true },
        works: { type: [Comic], required: true },
        drafts: { type: [Comic], required: true },
        bookmarks: { type: [ObjectId], required: true },
        banned: { type: Boolean, required: true }
    }, 
    { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)