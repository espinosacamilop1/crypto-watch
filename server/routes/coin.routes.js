const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Coin = require('../models/Coin.Model');

//gets the coin like amount
router.get('/coin-data', (req, res)=>{
    Coin.find().then((allCoins)=>{
        res.json(allCoins)
    })
})

//updates the counter on the coin model to be able to show it updated on front end

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
    .then(res =>{})

})

module.exports = router;
