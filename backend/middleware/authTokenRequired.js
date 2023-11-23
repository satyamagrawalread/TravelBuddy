require('dotenv').config();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
    const { authorization } = req.headers; 
    if(!authorization) {
        return res.status(401).send({error: "You must be logged in, key not given"});
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, payload) => {
        if(err) {
            return res.status(401).send({error: "You must be logged in, token invalid"});
        }
        const {_id} = payload;
        User.findById(_id).then(userData => {
            req.user = userData;
            next();
        })
    })
    next();
}