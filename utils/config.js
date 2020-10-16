require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

module.exports = {
    PORT,
    MONGODB_URI,
    GOOGLE_API_KEY
}