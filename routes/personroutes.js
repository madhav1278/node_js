const express = require('express');
const router = express.Router();
const person=require('./../models/person');

router.post('/', async (req,res) =>{
    try{
      const data=req.body;
  
      const newPerson = new person(data);
  
      const response = await newPerson.save();
      console.log('data saved');
      res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
  })
  
  router.get('/', async (req,res)=>{
    try{
      const data=await person.find();
      console.log('data fetched');
      res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'internal server error'});
    }
  }) 


  router.get('/person/:worktype', async(req,res)=>{
    try{
      const worktype = req.params.worktype;
        if(worktype == 'chef' || worktype == 'manager' || worktype == 'waiter'){
          const  response = await person.find({work: worktype});
          console.log('response fetches');
          res.status(200).json(response);
        }else{
            res.status(404).json({error: 'error work type'});
        }
    }catch (err){
        console.log(err);
        res.status(500).json({error: 'error'});
    }
  })

  router.put('/:id', async(req,res)=>{
    try{
        const personid=req.params.id;
        const updatedpersondata=req.body;

        const response=await person.findByIdAndUpdate(personid,updatedpersondata,{
            new: true,
            runValidators: true
        })

        if(!response){
            return res.status(404).json({error: 'person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'error'});
    }
  })

  router.delete('/:id',async(req,res)=>{
    try{
        const personid=req.params.id;

        const deletedata = await person.findByIdAndDelete(personid);

        if(!deletedata){
            res.status(404).json({error: 'person not found'});
        }
        console.log('data deleted');
        res.status(200).json(deletedata);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'error'});
    }
  })

  module.exports = router;