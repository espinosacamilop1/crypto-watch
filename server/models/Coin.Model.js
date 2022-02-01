const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Coin = new Schema({
    name: {type: String, required: true},
    favorites: 0
})

module.exports = mongoose.model('coins', Coin)