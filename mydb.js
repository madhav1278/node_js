const mongoose = require('mongoose');
require('dotenv').config();


// const mongoURL=process.env.MONGODB_URL_LOCAL;
const mongoURL=process.env.MONGODB_URL;

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

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

module.exports = db;