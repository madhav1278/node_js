const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    book_title: {
        required: true,
        type: String
    },
    author_name: {
        required: true,
        type: String
    },
    publisher_name: {
        required: true,
        type: String
    },
    published_year: {
        required: true,
        type: Number
    },
    ISBN: {
        required: true,
        type: String
    },
    quantity: {
        required: true,
        type: Number
    }
});

const book = mongoose.model('form', bookSchema);
module.exports = book;