// import the note model and validation util
const note = require('../models/noteModel');
const {validateReq} = require('../utils/validateReqData')

// controller functions
//1. read notes
exports.getAllNotes = async (req, res) => {
    try {
        const allNotes = await note.find(); 
        res.status(200).json(allNotes);
    } catch (error) {
        res.status(500).json({
            'error': 'Failed to fetch notes'
        })
    }
}

// 2. create note
exports.createNote = async (req, res) => {
    const validatedData = validateReq(req, res);
    if (!validatedData) return;
    const {title, body} = validatedData;
    try {
        const newNote = new note({title, body});
        await newNote.save();
        res.status(200).json(newNote);
    } catch (error) {
        res.status(500).json({
            'error': 'Failed to create note'
        })
    }
}