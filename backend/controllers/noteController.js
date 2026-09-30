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
            'error': 'Failed to fetch notes.'
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
        res.status(201).json(newNote);
        console.log(newNote)
    } catch (error) {
        res.status(500).json({
            'error': 'Failed to create note.'
        })
    }
}

// 3. edit note
exports.updateNote = async (req, res) => {
    const { id } = req.params;
    const validatedData = validateReq(req, res);
    if (!validatedData) return;
    try {
        const updatedNote = await note.findByIdAndUpdate(
            id,
            validatedData,
            {new: true, runValidators: true}
        )
        // in the event that the id isn't found on the dB
        if (!updatedNote) {
            return res.status(404).json({
                'error': 'Note not found!'
            })
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({
            'error': 'Failed to edit note.'
        })
    }
}

// 3. delete note
exports.deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNote = await note.findByIdAndDelete (id)
        // in the event that the id isn't found on the dB, deletedNote would return a null
        if (!deletedNote) {
            return res.status(404).json({
                'error': 'Note not found!'
            })
        }
        res.status(200).json("Note successfuly deleted.");
    } catch (error) {
        res.status(500).json({
            'error': 'Failed to delete note.'
        })
    }
}