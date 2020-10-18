const express = require("express")
const app = express()
const config = require('./utils/config')
const locationRouter = require("./controllers/location")
const mongoose = require("mongoose")

const uri = config.MONGODB_URI
mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology: true ,useFindAndModify: false }).then(() => {
    console.log(`connected to mongoDB via Mongoose`)
}
).catch( error => {
    console.error(error)
})

app.use(express.static('build'))

app.use("/locations",locationRouter)



module.exports = app