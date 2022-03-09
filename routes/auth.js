const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator'); // ...rest of the initial code omitted for simplicity.


// create a user using post: "api/auth/createuser". no login required
router.post('/createuser', [
    body('name', 'please enter a valied name').isLength({ min: 3 }),
    body('email', 'enter a valied mail').isEmail(),
    body('password', 'enter at list 5 char ').isLength({ min: 5 }),

], async (req, res) => {
    //if there are errors return bad request and errors
    const errors = validationResult(req);
    res.status(404);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "sorry a  user with this email aleady exists" })
        }

        // create a new user 
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
        })
        res.json(user)
        
        //this method catch errors
    } catch (error) {
        console.error(error.message);
        res.status(500).send("found some errors");

    }
})

module.exports = router;

