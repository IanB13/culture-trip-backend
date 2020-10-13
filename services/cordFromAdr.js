// uses google locations services to get    
const axios = require("axios")
const locations = require("../resources/locationScrape.json")
require("dotenv")
const locationSetURL = "https://maps.googleapis.com/maps/api/geocode/"
const googleAPIkey = process.env.GOOGLE_API_KEY 

const cordFromAdr = async (address) =>{
    const addressStr = toQueryStr(address)
    const requestStr = `${locationSetURL}json?address=${addressStr}&key=${googleAPIkey}`
    const response = await axios.get(requestStr)
    const coordinates = response.data.results[0].geometry.location
    //console.log(response.data.results[0])
    return {coordinates, address: response.data.results[0].formatted_address}
}

const toQueryStr = (unformatedStr) =>{
    console.log(typeof(unformatedStr))
    //space to +
    let str = unformatedStr.split(" ").join("+")
    //remove new line
    str = str.replace("\n","")
    console.log(str)
    return str
}

module.exports = cordFromAdr