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
const db = require('./mydb');
require('dotenv').config();
const passport = require('./auth');


const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next();
}
app.use(logRequest);

app.use(passport.initialize());
const localauthmiddleware = passport.authenticate('local', { session: false })

app.get('/', localauthmiddleware, function (req, res) {
  res.send('welcome to my world');
})

const menurouter = require('./routes/menuroutes');
app.use('/menu', localauthmiddleware, menurouter);

const personrouter = require('./routes/personroutes');
app.use('/person', localauthmiddleware, personrouter);

const bookrouter = require('./routes/bookroutes');
app.use('/book', bookrouter);

app.listen(PORT, () => {
  console.log('listening on port 3000');
})

