const mongoose = require('mongoose')
const { modelName } = require('./user-model')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const StorySchema = new Schema(
    {
        title: { type: String, required: true },
        creatorId: { type: ObjectId, required: true },
        creatorName: { type: String, required: true },
        cover: { type: Image, required: true },
        genres: { type: [String], required: true },
        ratings: { type: Double, required: true },
        description: { type: String, required: true },
        published: { type: Date, required: true },
        views: { type: Number, required: true},
        chapters: { type: [{ ObjectId, String, Date }], required: true }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Story', StorySchema)