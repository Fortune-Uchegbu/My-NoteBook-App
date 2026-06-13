// import packages and helpers
import express from 'express';
import cors from 'cors';
import { formatFormData } from './utils/formatFormData.js';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// locate json file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'data.json');

// helper file for async tasks

// read file
async function readData() {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data); //converts the json to js object
}

//write file
async function writeData(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// start up express app
const app = express();

// middleware/tools needed for the app
app.use(cors());
app.use(express.json())

// // hosted data
// let hostedData = {
//     noteList: [
//         {
//             "_id": "019e794f-7bc2-7326-b9ed-f27967d4b597",
//             "title": "Trying out something",
//             "body": "Testing two!"
//         },
//         {
//             "_id": "019e8d10-6972-73ec-a1c5-c0d894c60d5f",
//             "title": "Hiiii",
//             "body": "Setting up basic backend"
//         },
//         {
//             "_id": "019e8d10-c317-716c-bb84-81b8b3d28a5c",
//             "title": "Hiiiiii",
//             "body": "Setting up backend server"
//         },
//         {
//             "_id": "019e8d11-3d06-76fa-b1ab-acdc1e5c30ef",
//             "title": "Yahweh.",
//             "body": "He is my Father."
//         }
//     ],
// };

// endpoints/routes
// req body object to hold an array of arrays (2 sub arrays)
// fetch call for read
app.get('/api/notes', async (req, res) => {
    try {
        const hostedData = await readData();
        res.status(200).json(hostedData.noteList);
    } catch (error) {
        res.status(500).json({error: 'failed to read data.'})
    }
    
})

// post call for create
app.post('/api/notes', async (req, res) => {
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
app.put('/api/notes/:id', async (req, res) => {
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
app.delete('/api/notes/:id', async (req, res) => {
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


// request listener
const port = 5000;
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
})
