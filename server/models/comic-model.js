const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ComicSchema = new Schema(
    {
        title: { type: String, required: true },
        creatorId: { type: ObjectId, required: true },
        creatorName: { type: String, required: true },
        cover: { type: ObjectId, required: true },
        genres: { type: [String], required: true },
        ratings: { type: Number, required: true },
        description: { type: String, required: true },
        published: { type: Date, required: true },
        views: { type: Number, required: true},
        chapters: { type: [{ ObjectId, String, Date }], required: true }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Comic', ComicSchema)