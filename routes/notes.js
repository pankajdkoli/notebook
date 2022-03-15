const express = require('express');
const Note = require('../models/Note');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator'); // ...rest of the initial code omitted for simplicity.



// Route 1: get all notes using GET: "api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server erorr! Found");
    }

})

// Route 2: ADD new notes using post: POST "api/notes/addnote". login required 
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

// Route 3: Update an existing note using: PUT "api/notes/updatenote". login required 
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //creating a newNote Object..
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note to be updated and update it.
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send(" id not found")
        }
        //that time user id cheking while user update notes cheking if id not equal to note user.id
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not Allowed");
        }
        //update note     //{$set:newNote} is parameter { new: true }..is object to create for new content
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note }); //save it..! 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server erorr! Found");
    }

})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //find the note to be delered and delete it.
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send(" id not found")
        }
        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id)   //delete note...
        res.json({ "success": "Note has been deleted..!", note: note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server erorr! Found");
    }

})


module.exports = router;    