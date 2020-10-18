const locationRouter = require("express").Router()
const Location = require("../models/Location")
const stuff = require("../resources/locationScrape.json")
const addCords = require("../utils/addCords")
const scrape = require("../utils/scrape")
const cors = require('cors')
const config = require('../utils/config')
const { CITIES } = require("../utils/config")


//gets a list of locations
locationRouter.get("/",cors(), async (_request, response) => {
    const locations =  await Location.find({})
    response.status(200).json(locations)
})

//add locations to db using spreadsheet data
locationRouter.get("/add", async (_request, response) => {

    const locations = await Promise.all( CITIES.map( async (city) =>{
        Locations = await scrape(city)
        return ( Locations )
    }))
    console.log(locations.flat())
    await Location.insertMany(locations.flat())
    response.status(200).send("Success")
})

//uses google location api to get coordinates
locationRouter.get("/cords", async (_request, response) => {
    await addCords()
    response.status(200).send("Success")
})

//clear db
locationRouter.get("/deleteAll", async (_request, response) => {
    await Location.deleteMany({})
    response.status(200).send("Success")
})

module.exports = locationRouter