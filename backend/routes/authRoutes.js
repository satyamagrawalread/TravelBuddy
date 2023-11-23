const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authenticate = require('../middleware/authTokenRequired')

//
require('dotenv').config();

//
router.post('/signup', async (req, res) => {
    
    //get the body details
    console.log(req.body);
    const {name, email, password} = req.body;
    console.log(name, email, password);
    if(!name || !email || !password) {
        return res.status(422).send({error: 'Please fill all the fields'});
    }
    //Check if user exists
    await User.findOne({email: email})
        .then( async (savedUser) => {
                if(savedUser) {
                    return res.status(422).send({error: "User already exists"});
                }
                const user = new User({
                    name,
                    email,
                    password
                })

                try {
                    // To save data into the DB
                    await user.save();
                    //Creates a token using jwt
                    const token = jwt.sign({_id: user._id }, process.env.JWT_SECRETKEY);
                    res.status(201).send({message: "User added successfully", token: token});
                }
                catch(err) {
                    console.log('db err ', err);
                    res.status(422).send({ error: err.message});
                }
            }
        )
    // res.send('This is signup page');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(422).send({error: "Please add email or password"})
    }
    const savedUser = await User.findOne({email: email})

    if(!savedUser) {
        return res.status(422).send({error: "Invalid Credentials"});
    }
    console.log(savedUser);

    try {
        bcrypt.compare(password, savedUser.password, (err, result) => {
            if(result) {
                 console.log("Password matched");
                 const token = jwt.sign({_id: savedUser._id}, process.env.JWT_SECRETKEY);
                 return res.status(201).send({message: "Logged in successfully", token: token});
            }
            else {
                console.log("Password does not match");
                return res.status(422).send({error: "Invalid Credentials"});
            }
        })
    } catch (error) {
        
    }
})

module.exports = router;