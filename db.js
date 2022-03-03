const mongoose = require('mongoose');


const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connect To mongoose Sucessfully..!");
    })

}

module.exports = connectToMongo; 