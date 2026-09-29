const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    title: String,
    body: String
}, {timestamps: true}) //autogenerates createdAt and updatedAt fields
module.exports = mongoose.model('note', noteSchema);
