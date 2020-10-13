const locationRouter = require("express").Router()
const Location = require("../models/Location")
const stuff = require("../resources/locationScrape.json")


//gets a list of locations
locationRouter.get("/", async (_request, response) => {
    const locations =  await Location.find({})
    response.status(200).json(locations)
})

locationRouter.get("/add", async (_request, response) => {
    await Location.insertMany(stuff)
    response.status(200).json(locations)
})

module.exports = locationRouter