const express = require('express');
const User = require('../models/User');
const router = express.Router();
// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');


// create a user using post: "api/auth". This is for user file 
router.post('/', [

    body('name', 'please enter a valied name').isLength({ min: 3 }),
    body('email', 'please enter a valied email').isEmail(),
    body('password', 'enter at list 5 char ').isLength({ min: 5 }),
], (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    }).then(user => res.json(user))
        .catch(error => {console.log(error)
        res.json({error: 'please enter a unique email', message: error.message})})
        
    // req.send(res.body)
})

module.exports = router;