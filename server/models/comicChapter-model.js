const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ComicChapterSchema = new Schema(
    {
        name: { type: String, required: true },
        uploaded: { type: Date, required: true },
        images: { type: [Image], required: true }
    },
    { timestamps: true }
)

module.exports = mongoose.model('ComicChapter', ComicChapterSchema)