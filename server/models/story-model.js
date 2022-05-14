const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const StorySchema = new Schema(
    {
        title: { type: String, required: true },
        creatorId: { type: ObjectId, required: true },
        creatorName: { type: String, required: true },
        cover: { type: ObjectId, required: true },
        genres: { type: [String], required: true },
        ratings: { type: [String], required: true },
        description: { type: String, required: function() { return typeof this.description === 'String' } },
        published: { type: Date, required: false },
        views: { type: Number, required: true},
        chapters: { type: [String], required: true },
        comments: { type: [{ ObjectId, String, Date}], required: true }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Story', StorySchema)