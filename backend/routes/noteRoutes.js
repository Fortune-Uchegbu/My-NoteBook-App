const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// get call for read
router.get('/', noteController.getAllNotes);

// post call for create
router.post('/create', noteController.createNote);

// put call for edit
router.patch('/edit/:id', noteController.updateNote);

// delete call for delete
router.delete('/delete/:id', noteController.deleteNote);

module.exports = router;