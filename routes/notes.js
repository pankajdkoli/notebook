const express = require('express');
const Note = require('../models/Note');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator'); // ...rest of the initial code omitted for simplicity.



// Route 1: get all notes using post: GET "api/auth/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server erorr! Found");
    }

})

// Route 2: ADD new notes using post: POST "api/auth/addnote". login required 
router.post('/addnote', fetchuser, [
    body('title', 'please enter a valid title').isLength({ min: 3 }),
    body('description', 'Descripton must be atlist 5 character ').isLength({ min: 5 }),], async (req, res) => {
    try {
        const { title, description, tag } = req.body; // dustructuring  method..

        //if there are errors return bad request and errors
        const errors = validationResult(req);
        res.status(404);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //create a new notes 
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        //save notes
        const saveNote = await note.save()
        res.status(200);
        res.json(saveNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server erorr! Found");
    }
})

module.exports = router;    