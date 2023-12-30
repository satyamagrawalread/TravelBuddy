const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    image_data: {
        image_url: String,
        public_id: String,
    },
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    hobbies: {
        type: String
    }
});

mongoose.model("Profile", profileSchema);
