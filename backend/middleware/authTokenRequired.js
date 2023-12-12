require('dotenv').config();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization) {
        return res.status(401).send({ error: "You must be logged in, key not given" });
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, payload) => {
        if (err) {
            console.log("Invalid token");
            return res.status(401).send({ error: "You must be logged in, token invalid" });
        }
        else {
            const { _id } = payload;
            User.findById(_id).then(userData => {
                console.log('from authenticate:', userData);
                req.user = userData;
                next();
            })
        }
    })
}