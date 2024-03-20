const mongoose = require('mongoose');
require('dotenv').config();


// const mongoURL ='mongodb://localhost:27017/std'
// const mongoURL='mongodb+srv://madhavdhimmar7878:JNF89WVnf9H91gOX@cluster0.2qh8dat.mongodb.net/'
const mongoURL=process.env.MONGODB_URL;

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Connected to MongomyDB server');
});

db.on('error',(err)=>{
    console.error("MongomyDB disconnected",err);
});

db.on('disconnection', () => {
    console.log('MongoDB disconnection');
});