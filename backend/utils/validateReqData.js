const validateReq = (req, res) => {

    const {title, body} = req.body;
    // validation before interaction with dB
    // a. char type
    if ( typeof title !== string || typeof body !== string ) {
        res.status(400).json({
            'error': 'Title and Body must be Strings'
        });
        return null;
    }
    const trimmedTitle = title.trim()
    const trimmedBody = body.trim();
    // b. empty fields
    if (!trimmedTitle || !trimmedBody) {
        res.status(400).json({
            'error': 'All fields are required!'   
        });
        return null;
    }
    return {trimmedTitle, trimmedBody};
}

module.exports = { validateReq };