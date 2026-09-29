const express = require('express');
const router = express.Router()

router.get('/api/notes', async (req, res) => {
    try {
        const hostedData = await readData();
        res.status(200).json(hostedData.noteList);
    } catch (error) {
        res.status(500).json({error: 'failed to read data.'})
    }
    
})

// post call for create
router.post('/api/notes', async (req, res) => {
    const nullValPresent = (req.body).some(([key, value]) => !value || !value.trim());
    if (nullValPresent) {
        return res.status(404).json({error: "inputs are empty!"});
    }
    // process incomng form data - backend version
    try {
        const hostedData = await readData();
        const parameters = {
            rawDataPairs: req.body,
            id: null
        }        
        const noteObj = formatFormData(parameters).noteObj;
        hostedData.noteList.push(noteObj);
        await writeData(hostedData);
        res.status(201).json({message: "note created successfully!", note: noteObj});
    } catch (error) {
        res.status(500).json({ error: "failed to save note." });
    }
    
})

// put call for edit
router.put('/api/notes/:id', async (req, res) => {
    const id = req.params.id
    const nullValPresent = (req.body).some(([key, value]) => !value || !value.trim());
    if (nullValPresent) {
        res.status(404).json({error: "inputs are empty!"});
        return;
    }
    try {
        const hostedData = await readData();
        const parameters = {
            rawDataPairs: req.body,
            id: req.params.id
        }
        const noteObj = formatFormData(parameters).noteObj;
        const toBeEdited = hostedData.noteList.find(note => note._id === id);
        if (!toBeEdited) return res.status(404).json({error: "note not found!"})
        // implement changes
        toBeEdited.title = noteObj.title;
        toBeEdited.body = noteObj.body;
        await writeData(hostedData);
        res.status(201).json({message: "note edited successfully!", note: noteObj});
    } catch (error) {
        res.status(500).json({ error: "failed to edit note." });
    }
    
})

// delete call for delete
router.delete('/api/notes/:id', async (req, res) => {
    try {
        const hostedData = await readData();
        const id = req.params.id;
        const newNoteList = hostedData.noteList.filter(note => note._id != id);
        // if note doesn't exist
        if (newNoteList.length === hostedData.noteList.length) {
            return res.status(404).json({error: 'note not found!'})
        }
        hostedData.noteList = newNoteList;
        await writeData(hostedData);
        res.status(200).json({message: `note with id ${id} deleted successfully`})
    } catch (error) {
        res.status(500).json({ error: "failed to save data." });
    }
    
})
