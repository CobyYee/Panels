const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StoryChapterSchema = new Schema(
    {
        name: { type: String, required: true },
        uploaded: { type: Date, required: false },
        chapter: { type: Object, required: false }
    },
    { timestamps: true }
)

module.exports = mongoose.model('StoryChapter', StoryChapterSchema)