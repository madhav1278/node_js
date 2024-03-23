const express = require('express');
const router = express.Router();
const menu = require('./../models/menu');

router.post('/', async (req, res) => {
  try {
    const data = req.body;

    const newMenu = new menu(data);

    const response = await newMenu.save();

    console.log('menu done');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Menu server error' });
  }
})

router.get('/', async (req, res) => {
  try {
    const data = await menu.find();
    console.log('menu data fetched');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'internal menu server error' });
  }
})

router.get('/:tastetype', async (req, res) => {
  try {
    const tastetype = req.params.tastetype;
    if (tastetype == 'sweet' || tastetype == 'spicy') {
      const response = await menu.find({ taste: tastetype });
      console.log('response fetches');
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'error work type' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'error' });
  }
})
module.exports = router;