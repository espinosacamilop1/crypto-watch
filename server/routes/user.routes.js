const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/User.Model')

router.put('/update-coin-value', (req, res)=>{
    const {newUser,id} = req.body;

    User.findByIdAndUpdate(id, newUser)
    .then(user => {
    })
})

module.exports = router;