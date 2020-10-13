const express = require("express")
const app = express()
require("dotenv").config()
const locationRouter = require("./controllers/location")
const mongoose = require("mongoose")

const uri = process.env.MONGODB_URI

mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology: true  }).then(() => {
    console.log(`connected to mongoDB via Mongoose`)
}
).catch( error => {
    console.error(error)
})

//scraping stuff: will move 
const scrape = require("./utils/scrape")

const start = async()=>{
    await scrape()
}
//start()
//
app.use("/locations",locationRouter)



module.exports = app