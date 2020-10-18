// uses google locations services to get coordinates from locations
const axios = require("axios")
const config = require("../utils/config")
const locationSetURL = "https://maps.googleapis.com/maps/api/geocode/"
const googleAPIkey = config.GOOGLE_API_KEY 

const cordFromAdr = async (address) =>{
    const addressStr = toQueryStr(address)
    const requestStr = `${locationSetURL}json?address=${addressStr}&key=${googleAPIkey}`
    const response = await axios.get(requestStr)
    const coordinates = response.data.results[0]?.geometry?.location
    if (coordinates) {
        return {coordinates, address: response.data.results[0].formatted_address}
    }
    else return undefined
}

//transforms scraped string into queryable string
const toQueryStr = (unformatedStr) =>{
    //space to +
    let str = unformatedStr.split(" ").join("+")
    //remove new line
    str = str.replace("\n","")
    return str
}

module.exports = cordFromAdr