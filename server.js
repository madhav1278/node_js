// dev 
// app.post('/book', async (req,res)=>{
//     try{
//         const data = req.body;
  
//         const newBook = new book(data);
  
//         const response = await newBook.save();
  
//         console.log('book done');
//         res.status(200).json(data);
//     } catch(err){
//       console.log(err);
//       res.status(500).json({error: 'book server error'});
//     }
//   })


// var fs = require('fs');
// var os = require('os');
// var user = os.userInfo();
// console.log(user);

// fs.appendFile('gen.txt','hi' + user.username +'!\n',()=>{
//     console.log("fil is created");
// });


const express = require('express');
const app = express();

const db=require('./mydb');
const person=require('./models/person');
const menu=require('./models/menu');
const book=require('./models/book');


const bodyParser = require('body-parser');
app.use(bodyParser.json());


const personrouter= require('./routes/personroutes');

app.use('/person',personrouter);

const menurouter=require('./routes/menuroutes');

app.use('/menu',menurouter);

app.listen(3000,()=>{
  console.log('listening on port 3000');
})




// server tari 
