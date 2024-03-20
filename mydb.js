const mongoose = require('mongoose');

const mongoURL ='mongodb://localhost:27017/std'

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