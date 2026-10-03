const noteModel = require("../models/noteModel");

const validateReq = (req, res) => {

    const {title, body} = req.body;
    console.log(title, body)
    // validation before interaction with dB
    // a. char type
    if ( typeof title !== "string" || typeof body !== "string" ) {
        console.log("error:", title, body)
        res.status(400).json({
            'error': 'Title and Body must be Strings'
        });
        return null;
    }
    console.log("success:", title, body)
    const trimmedTitle = title.trim()
    const trimmedBody = body.trim();
    // b. empty fields
    if (!trimmedTitle || !trimmedBody) {
        res.status(400).json({
            'error': 'All fields are required!'   
        });
        return null;
    }
    const note = {title, body};
    return note;
}

module.exports = { validateReq };