const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Coin = require('../models/Coin.Model');

router.get('/coin-data', (req, res)=>{
    Coin.find().then((allCoins)=>{
        res.json(allCoins)
    })
})

router.post('/like-counter', (req, res)=>{

    const {coinId, coin,likeValue, likeTotal} = req.body;
    const counter = likeValue ? 1 : -1;
    let newLikeAmount;
    
    if(likeTotal + counter < 0){
        newLikeAmount = 0;
    }else{
        newLikeAmount = likeTotal + counter;
    }
    Coin.findByIdAndUpdate({_id:coinId}, {favorites: newLikeAmount})
    .then(res => console.log(res))

})

module.exports = router;
