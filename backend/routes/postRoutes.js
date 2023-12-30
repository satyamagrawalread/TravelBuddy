const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary (replace with your Cloudinary credentials)
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { files: 10 } });


const uploadToCloudinary = (fileBuffer, folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: folder }, (error, result) => {
            if (error) {
                // Assume 'UploadError' is a custom error type
                const uploadError = new Error("Couldn't upload to Cloudinary");
                uploadError.name = 'UploadError';
                reject(uploadError);
            } else {
                resolve(result);
            }
        }).end(fileBuffer);
    });
};

router.post('/addPost', upload.array('images', 5), async (req, res) => {
    console.log("Called addPost API")
    try {
        const { email, description, post_id } = req.body;
        if (!email) {
            return res.status(422).send({ error: "Email not found" });
        }
        if (post_id) {
            const post_id_object = mongoose.Types.ObjectId(post_id);
            const savedPostData = await Post.findOne({ _id: post_id_object })
            if (savedPostData) {
                if (description !== savedPostData.description) {
                    const postResult = await Post.updateOne({ _id: post_id_object }, { $set: { description: description } })
                    if (postResult.modifiedCount > 0) {
                        return res.status(201).send({ message: "Post updated successfully" });
                    }
                    else {
                        return res.status(422).send({ error: "Could not update Data" })
                    }
                }
                return res.status(201).send({ message: "Nothing to update" })
            }
            return res.status(422).send({ error: "Could not find post" })

        }
        const filesData = req.files;
        console.log(filesData);
        const uploadPromises = filesData.map((file) => {
            return uploadToCloudinary(file.buffer, 'posts');
        });

        const cloudinaryResults = await Promise.all(uploadPromises);
        // console.log(cloudinaryResults);
        const profile_images_data = cloudinaryResults.map((result) => {
            return {
                image_url: result.secure_url,
                public_id: result.public_id
            }
        })
        console.log(profile_images_data);
        const postData = new Post({
            email: email,
            description: description,
            post_images_data: profile_images_data
        });
        await postData.save();
        return res.status(201).send({message: "Post added successfully"});
    } catch (error) {
        console.error('Error handling multiple file upload:', error);
        // Check if it's a specific type of error (e.g., Cloudinary upload failure)
        if (error.name === 'UploadError') {
            return res.status(422).send({ error: "Couldn't upload the image to Cloudinary" });
        } else {
            return res.status(500).send({ error: "Something went wrong" });
        }
    }
})

router.get('/getAllPosts', async (req, res) => {
    Post.find({}).then((posts) => {
        console.log(posts);
            return res.status(201).send({message: "Received all posts", posts: posts})
    }).catch((error) => {
        console.error(error);
            return res.status(422).send({error: "Something went wrong"});
    })
        
})

module.exports = router;