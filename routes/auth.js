const express = require('express');
const User = require('../models/User');
const router = express.Router();


// create a user using post: "api/auth". This is for user file 

router.post('/', (req, res) => {

    const user = User(req.body);

    console.log('test', req.body);
    user.save()
    res.send(user);
})

module.exports = router;