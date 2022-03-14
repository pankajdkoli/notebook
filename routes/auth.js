const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator'); // ...rest of the initial code omitted for simplicity.
const bcrypt = require('bcryptjs'); //for hashing
var jwt = require('jsonwebtoken'); //secretOrPrivateKey for pass is called singnature
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'secretkey@123';   //secret key means singnature   



// Router 1: create a user using post: "api/auth/createuser". no login required
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
            return res.status(400).json({ error: "sorry a user with this email aleady exists" })
        }

        // using hashing password method and salt
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // create a new user 
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })

        //this is one object of data
        const data = {
            id: user.id
        }
        const authToken = jwt.sign(data, JWT_SECRET)   //call JWT__SECRET variable and set secrete key for pass 
        res.status(200);
        res.json({ authToken })

        //this method catch errors
    } catch (error) {
        console.error(error.message);
        res.status(500).send("found some errors");

    }
})

// Router 2: login a user using post: "api/auth/login". no login required
router.post('/login', [
    body('email', 'Enter a valid mail').isEmail(),
    body('password', 'Password cannot be blank').exists(),

], async (req, res) => {

    //if there are errors return bad request and errors
    const errors = validationResult(req);
    res.status(404);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Checking user email is correct
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });     // Validate if user exist in our database
        if (!user) {
            return res.status(400).json({ error: "please try to loging with correct credentials" });

        }
        //password checking while user login enter correct or wrong pass
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "please try to loging with correct credentials" });
        }

        //this is one object of data
        const data = {
            id: user.id
        }
        //call JWT__SECRET vari and set secrete key for pass and save into database
        const authToken = jwt.sign(data, JWT_SECRET)
        res.status(200);
        res.json({ authToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server erorr! Found");

    }

})

//ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
                     //pass fetchuser first call arg then async call
router.post('/getuser', fetchuser, async (req, res) => { 

    try {
        const user = await User.findById(req.user.id).select("-password");
        res.send(user) 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;

