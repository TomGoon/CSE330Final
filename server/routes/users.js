const router = require('express').Router();
let User = require('../models/users.model');

// Route to register a user
router.route("/register").post((req,res) => {

    // Create a User object defined by the provided Schema
    const newUser = new User(req.body);

    newUser.save()
        .then(result => {
            if(result){
                res.json(true);
            }
            else{
                res.json(false);
            }
            return result;
        })
        .catch(err => res.status(400).json('ERROR: ' + err));  
});

// Route to check if a user exists
router.route("/checkExistingUser").post((req,res) => {
    // Username and email must be unique
    const username = req.body.username;
    const email = req.body.email;

    // OR method adapted from: https://stackoverflow.com/questions/7382207/mongooses-find-method-with-or-condition-does-not-work-properly
    return User.find({ $or:[{'username':username}, {'email':email}]})
        .then(result => {
            if(result) {
                res.json(true);
            } else {
                res.json(false);
            }
            return result;
        })
        .catch(err => res.status(400).json('ERROR: ' + err));       
});

// Route to verify the user's login
router.route('/login').post((req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    return User.findOne({username: username, password: password})
        .then(result => {
            console.log(result);
            if(result) {
                res.json(true);
            } else {
                res.json(false);
            }
            return result;
        })
        .catch(err => res.status(400).json('ERROR: ' + err));
});

module.exports = router;