const mongoose = require('mongoose')
const Schema = mongoose.Schema

const KonvaSchema = new Schema(
    {
        data: { type: Buffer, required: true }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Konva", KonvaSchema)