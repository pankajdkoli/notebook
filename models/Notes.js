const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({

    title: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true,
    },
    tags: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        require: Date.now
    },

});


module.export = mongoose.model('notes', NotesSchema); 