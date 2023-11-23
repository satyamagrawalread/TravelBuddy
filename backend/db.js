const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.mongo_URL).then(
    () => {
        console.log('connected to database');
    }
)
.catch((error) => {
    console.log('Could not connect to database: ' + error)
})