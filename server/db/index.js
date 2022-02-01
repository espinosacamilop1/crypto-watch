const mongoose = require('mongoose')

mongoose
        .connect('mongodb://127.0.0.1:27017/crypto-watch', {useNewUrlParser: true})
        .catch(e =>{
            console.error('connection error', e.message)
        })
        
const db = mongoose.connection

module.exports = db;