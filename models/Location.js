const mongoose = require("mongoose")

const locationSchema = new mongoose.Schema({
    name: String,
    image: String,
    address: String,
    coordinates: {
        lat: Number,
        lng: Number
    },
    city: String,
    
})

const Location = mongoose.model("Locations", locationSchema)

module.exports = Location