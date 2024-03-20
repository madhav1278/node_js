const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    aname: {
        type: String,
        required: true
    },
    pname: {
        type: String,
        required: true
    },
    pyear: {
        type: Date,
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    quan: {
        type: Number
    },
});

const book = mongoose.model('book', bookSchema);
module.exports = book;