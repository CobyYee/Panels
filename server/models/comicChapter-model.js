const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ComicChapterSchema = new Schema(
    {
        name: { type: String, required: true },
        uploaded: { type: Date, required: true },
        images: { type: [ObjectId], required: true }
    },
    { timestamps: true }
)

module.exports = mongoose.model('ComicChapter', ComicChapterSchema)