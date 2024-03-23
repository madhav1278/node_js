const express = require('express');
const router = express.Router();

const book = require('./../models/book');

router.use(express.urlencoded({ extended: true }));

router.post('/', async (req, res) => {
  try {
    const data = req.body;

    const newBook = new book(data);

    const response = await newBook.save();
    console.log('data saved');
    res.status(200).json(response);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
})

module.exports = router;