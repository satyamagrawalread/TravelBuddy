const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const Profile = mongoose.model('Profile');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

router.post('/profileCheck', (req, res) => {
    const {email} = req.body;
    console.log(email);
    Profile.findOne({email: email})
    .then((savedProfile) => {
        if(savedProfile) {
            console.log(savedProfile);
            return res.status(200).send({message: "User Profile Updated", profile: savedProfile});
        }
        else {
            return res.status(200).send({message: "Profile Incomplete"})
        }
    })
    .catch((error) => {
        console.error(error);
        return res.status(422).send({error: "Something went wrong"});
    })
})

router.post('/addProfile', (req, res) => {
    const {email, name, mobile, location, occupation, date_of_birth, gender, hobbies} = req.body;
    console.log(req.body);
    if(
        !email ||
        !name ||
        !mobile ||
        !location ||
        !occupation ||
        !date_of_birth ||
        !gender
    ) {
        
        return res.status(422).send({ error: 'Please fill all the required fields' });
    }

    Profile.findOne({email: email})
    .then(async (savedProfile) => {
        if(savedProfile) {
            return res.status(422).send({error: "User Profile is already done"})
        }
        try {
            const userProfile = new Profile({
                email,
                name,
                mobile,
                location,
                occupation,
                date_of_birth,
                gender,
                hobbies
            });
            await userProfile.save();
            return res.status(201).send({message: "User Profile is completed successfully"});
        } catch (error) {
            console.error(error);
            return res.status(422).send({error: "Something went wrong"})
        }
    })
    

});


router.post('/updateProfile', (req, res) => {
    const {email, name, mobile, location, occupation, date_of_birth, gender, hobbies} = req.body;
    console.log(req.body);
    if(
        !email ||
        !name ||
        !mobile ||
        !location ||
        !occupation ||
        !date_of_birth ||
        !gender
    ) {
        
        return res.status(422).send({ error: 'Please fill all the required fields' });
    }

    try {
        Profile.findOne({email: email})
        .then((savedProfile) => {
            if(savedProfile) {
                let newValues = {};
                if(savedProfile.name !== name) {
                    newValues.name = name;
                }
                if(savedProfile.mobile !== mobile) {
                    newValues.mobile = mobile;
                }
                if(savedProfile.location !== location) {
                    newValues.location = location;
                }
                if(savedProfile.occupation !== occupation) {
                    newValues.occupation = occupation;
                }
                if(savedProfile.date_of_birth !== date_of_birth) {
                    newValues.date_of_birth = date_of_birth;
                }
                if(savedProfile.gender !== gender) {
                    newValues.gender = gender;
                }
                if(savedProfile.hobbies !== hobbies) {
                    newValues.hobbies = hobbies;
                }
                console.log(newValues);
                Profile.updateOne({email: email}, { $set: newValues})
                .then((result) => {
                    
                    if (result.modifiedCount > 0) {
                        // The update was successful, and at least one document was modified.
                        console.log("Document updated successfully");
                        return res.status(200).send({ message: "Document updated successfully" });
                    } else {
                        // No document was modified. It could be that the document didn't match the query.
                        console.log("No document matched the query or no modification needed");
                        return res.status(404).send({ error: "No document matched the query or no modification needed" });
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    return res.status(500).send({ error: "Internal Server Error" });
                })
            }
            else {
                return res.status(404).send({ error: "No document matched the query or no modification needed" });
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(201).send({error: "Something went wrong"});
    }
})


module.exports = router;