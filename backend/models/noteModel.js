const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
    }
}, {timestamps: true}) //autogenerates createdAt and updatedAt fields
module.exports = mongoose.model('note', noteSchema);
