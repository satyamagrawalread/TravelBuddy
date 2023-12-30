const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserImage = mongoose.model('UserImage');
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
const upload = multer({ storage: storage });


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

router.post('/profileImageCheck', async (req, res) => {
    try {
        const { email } = req.body;
        const savedProfileImage = await UserImage.findOne({ email: email });

        if (savedProfileImage) {
            return res.status(200).send({ message: "User Profile Image Updated", profile_image: savedProfileImage });
        } else {
            return res.status(200).send({ message: "Profile Image does not exist" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Something went wrong" });
    }
});



router.post('/uploadImage', upload.single('image'), async (req, res) => {
    try {
        const { email, public_id } = req.body;
        if (!email) {
            return res.status(422).send({ error: "Email not found" });
        }

        const result = await uploadToCloudinary(req.file.buffer, 'profiles');

        const savedImageData = await UserImage.findOne({ email: email });
        if (!savedImageData) {
            const imageData = new UserImage({ email });
            await imageData.save();
        }

        const profileResult = await UserImage.updateOne(
            { email: email },
            { $set: { profile_image_data: { image_url: result.secure_url, public_id: result.public_id } } }
        );

        if (profileResult.modifiedCount > 0) {
            // The update was successful, and at least one document was modified.
            console.log("Profile Image updated successfully");
            if (public_id) {
                await cloudinary.uploader.destroy(public_id);
            }
            return res.status(200).send({ message: "Profile Image updated successfully" });
        } else {
            // No document was modified. It could be that the document didn't match the query.
            console.log("Couldn't update the profile image in the database");
            if (result.public_id) {
                await cloudinary.uploader.destroy(result.public_id);
            }
            return res.status(404).send({ error: "Couldn't update the profile image" });
        }
    } catch (error) {
        console.error(error);
        // Check if it's a specific type of error (e.g., Cloudinary upload failure)
        if (error.name === 'UploadError') {
            return res.status(422).send({ error: "Couldn't upload the image to Cloudinary" });
        } else {
            return res.status(500).send({ error: "Something went wrong" });
        }
    }
});

module.exports = router;



