// import packages and helpers
import express from 'express';
import cors from 'cors';
import { formatFormData } from './utils/formatFormData.js';

// start up express app
const app = express();

// middleware/tools needed for the app
app.use(cors());
app.use(express.json())

// hosted data
let hostedData = {
    noteList: [
        {
            "_id": "019e794f-7bc2-7326-b9ed-f27967d4b597",
            "title": "Trying out something",
            "body": "Testing two!"
        },
        {
            "_id": "019e8d10-6972-73ec-a1c5-c0d894c60d5f",
            "title": "Hiiii",
            "body": "Setting up basic backend"
        },
        {
            "_id": "019e8d10-c317-716c-bb84-81b8b3d28a5c",
            "title": "Hiiiiii",
            "body": "Setting up backend server"
        },
        {
            "_id": "019e8d11-3d06-76fa-b1ab-acdc1e5c30ef",
            "title": "Yahweh.",
            "body": "He is my Father."
        }
    ],
};

// endpoints/routes
const call = '/api/notes';

app.get(call, (req, res) => {
    res.status(200).json(hostedData.noteList);
})

app.post(call, (req, res) => {
    // process incomng form data - backend version
    const formattedObj = formatFormData(req.body);
    const noteObj = formattedObj.noteObj;
    const newHostedData = () => {
        if(!(formattedObj.isEditing)) /*creating*/ {
            return {
                ...hostedData, 
                noteList: [...hostedData.noteList, noteObj]
            }
        } else /*editing*/ {
            return {
                ...hostedData, 
                noteList: hostedData.noteList.map(note => (note._id === noteObj._id) ? noteObj : note)
            }
        }
    }
    console.log(newHostedData);
})

// request listener
const port = 5000;
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
})
