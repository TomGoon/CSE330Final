let mongoose = require("mongoose");

let Schema = mongoose.Schema;

const listingSchema = new Schema({
    username:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    filename:{
        type: String,
        required: true
    },
    listingName:{
        type: String,
        required: true
    },
    price:{
        type: Number, 
        min: 0, 
        max: 10000,
        required: true,
    },
    downloads:{
        type: Number,
        required: true,
    }
});

const ByteListing = mongoose.model('ByteListing', listingSchema);
module.exports = ByteListing;