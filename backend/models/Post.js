const mongoose = require('mongoose');

const postImageSchema = new mongoose.Schema({
    image_url: {
        type: String
    },
    public_id: {
        type: String
    }
})

const postSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    post_images_data: [postImageSchema]
})

mongoose.model("Post", postSchema);