const noteModel = require("../models/noteModel");

const validateReq = (req, res) => {

    const {title, body} = req.body;
    // console.log(title, body)
    // validation before interaction with dB
    // a. char type
    if ( typeof title !== "string" || typeof body !== "string" ) {
        console.log(title, body)
        res.status(400).json({
            'error': 'Title and Body must be Strings'
        });
        return null;
    }
    // console.log(title, body)
    const trimmedTitle = title.trim()
    const trimmedBody = body.trim();
    // b. empty fields
    if (!trimmedTitle || !trimmedBody) {
        res.status(400).json({
            'error': 'All fields are required!'   
        });
        return null;
    }
    const note = {
        title: trimmedTitle,
        body: trimmedBody
    };
    console.log(note);
    return note;
}

module.exports = { validateReq };