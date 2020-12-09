const router = require('express').Router();
let ByteListing = require('../models/listing.model');

// Route to upload a soundbyte listing to dB
router.route('/uploadSoundbyteListing').post((req,res) => {
    console.log(req.body);
    let newListing = new ByteListing(req.body);	
    newListing.save()
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

// Route to get all soundbyte listings from dB
router.route('/getListings').get((req,res) => {
    console.log(req.body);
    ByteListing.find()
        .then(result => res.json(result))
        .catch(err => res.status(400).json('ERROR: ' + err));  	
});

// Route to get all soundbytes by a given user
router.route('/getProfile').post((req,res) => {
    console.log(req.body);
    ByteListing.find({username: req.body.profile})
        .then(result => res.json(result))
        .catch(err => res.status(400).json('ERROR: ' + err));  	
});

// Route to download soundbyte adapted from https://stackoverflow.com/questions/7288814/download-a-file-from-nodejs-server-using-express
router.route('/download').post((req,res) => {
    const file = `../../soundbyte_uploads/${req.body.filename}`;
    res.download(file); // Set disposition and send it.	
});


// Route to update the download counter
router.route('/updatedownloads').post((req, res) => {
    ByteListing.findOneAndUpdate({
        listingName: req.body.listingName
    }, { $inc: {downloads:1} })
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
})


// Route to delete a soundbyte
router.route('/deleteSoundbyte').post((req,res) => {

    ByteListing.deleteOne({listingName: req.body.name})
        .then(result => res.json(result))
        .catch(err => res.status(400).json('ERROR: ' + err));  	
});

// Route to search for a soundbyte
router.route('/searchSoundbyte').post((req,res) => {
    
    ByteListing.findOne({listingName: req.body.search})
        .then(result => res.json(result))
        .catch(err => res.status(400).json('ERROR: ' + err));  	
});

module.exports = router;