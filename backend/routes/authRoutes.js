const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authenticate = require('../middleware/authTokenRequired')
const nodemailer = require('nodemailer');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

//
require('dotenv').config();

//nodemailer
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "noreplytotravelbuddy@gmail.com",
        pass: "cxto abnt fgbb wxld",
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function mailer(receiverMail, code) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: 'noreplytotravelbuddy@gmail.com', // sender address
        to: `${receiverMail}`, // list of receivers
        subject: "Signup verification", // Subject line
        text: `Your verification code is ${code}`, // plain text body
        html: `<b>Your verification code is ${code}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
}
//

router.post('/verify', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    if (!name || !email || !password) {
        return res.status(422).send({ error: 'Please fill all the fields' });
    }
    //Check if user exists
    await User.findOne({ email: email })
        .then(async (savedUser) => {
            if (savedUser) {
                return res.status(422).send({ error: "User already exists" });
            }
            try {
                let verificationCode = Math.floor(100000 + Math.random() * 900000);
                let user = {
                    name,
                    email,
                    password,
                    verificationCode
                }
                mailer(email, verificationCode);
                res.send({message: "Verification code sent to your email", userData: user});
            } catch (error) {
                console.log(error);
            }
        }
        )
    
})
//
router.post('/signup', async (req, res) => {

    //get the body details
    console.log(req.body);
    const { name, email, password } = req.body;
    console.log(name, email, password);
    if (!name || !email || !password) {
        return res.status(422).send({ error: 'Please fill all the fields' });
    }
    //Check if user exists
    await User.findOne({ email: email })
        .then(async (savedUser) => {
            if (savedUser) {
                return res.status(422).send({ error: "User already exists" });
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
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRETKEY);
                res.status(201).send({ message: "User added successfully", token: token });
            }
            catch (err) {
                console.log('db err ', err);
                res.status(422).send({ error: err.message });
            }
        }
        )
    // res.send('This is signup page');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send({ error: "Please add email or password" })
    }
    const savedUser = await User.findOne({ email: email })

    if (!savedUser) {
        return res.status(422).send({ error: "Invalid Credentials" });
    }
    console.log(savedUser);

    try {
        bcrypt.compare(password, savedUser.password, (err, result) => {
            if (result) {
                console.log("Password matched");
                const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRETKEY);
                return res.status(201).send({ message: "Logged in successfully", token: token });
            }
            else {
                console.log("Password does not match");
                return res.status(422).send({ error: "Invalid Credentials" });
            }
        })
    } catch (error) {

    }
})

module.exports = router;