const Location = require("../models/Location")
const cordFromAdr = require("../services/cordFromAdr")

const addCords = async () => {
    const locations = await Location.find({})
    for(const location of locations){
        if(location.address && !location.cordinates){
            const cordObj = await cordFromAdr(location.address)
            await Location.findByIdAndUpdate(location._id, cordObj)
        }
     
    }
}

module.exports = addCords