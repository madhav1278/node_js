const express = require('express');
const router = express.Router();
const person = require('./../models/person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');


router.post('/signup', async (req, res) =>{
  try{
      const data = req.body 
      const newPerson = new person(data);

      const response = await newPerson.save();
      console.log('data saved');

      const payload = {
          id: response.id,
          username: response.username
      }
      console.log(JSON.stringify(payload));
      const token = generateToken(payload);
      console.log("Token is : ", token);

      res.status(200).json({response: response, token: token});
  }
  catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
  }
})


router.post('/login', async(req, res) => {
  try{
      const {username, password} = req.body;

      const user = await person.findOne({username: username});

      if( !user || !(await user.comparePassword(password))){
          return res.status(401).json({error: 'Invalid username or password'});
      }

      const payload = {
          id: user.id,
          username: user.username
      }
      const token = generateToken(payload);

      res.json({token})
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try{
      const userData = req.user;
      console.log("User Data: ", userData);

      const userId = userData.id;
      const user = await Person.findById(userId);

      res.status(200).json({user});
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})




router.post('/', async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new person(data);

    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.get('/', async (req, res) => {
  try {
    const data = await person.find();
    console.log('data fetched');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'internal server error' });
  }
})


router.get('/person/:worktype', async (req, res) => {
  try {
    const worktype = req.params.worktype;
    if (worktype == 'chef' || worktype == 'manager' || worktype == 'waiter') {
      const response = await person.find({ work: worktype });
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

router.put('/:id', async (req, res) => {
  try {
    const personid = req.params.id;
    const updatedpersondata = req.body;

    const response = await person.findByIdAndUpdate(personid, updatedpersondata, {
      new: true,
      runValidators: true
    })

    if (!response) {
      return res.status(404).json({ error: 'person not found' });
    }

    console.log('data updated');
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'error' });
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const personid = req.params.id;

    const deletedata = await person.findByIdAndDelete(personid);

    if (!deletedata) {
      res.status(404).json({ error: 'person not found' });
    }
    console.log('data deleted');
    res.status(200).json(deletedata);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'error' });
  }
})

module.exports = router;