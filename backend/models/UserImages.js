const mongoose = require('mongoose');


const UserImagesSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    profile_image_data: {
        image_url: String,
        public_id: String,
    },
});

mongoose.model("UserImage", UserImagesSchema);
