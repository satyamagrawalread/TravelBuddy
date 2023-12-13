const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authenticate = require('../middleware/authTokenRequired')
const nodemailer = require('nodemailer');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

router.post('/addProfile', (req, res) => {
    const {email, name, location, occupation, date_of_birth, gender, hobbies} = req.body;
    if(
        !email ||
        !name ||
        !location ||
        !occupation ||
        !date_of_birth ||
        gender
    ) {
        return res.status(422).send({ error: 'Please fill all the required fields' });
    }
})

module.exports = router;