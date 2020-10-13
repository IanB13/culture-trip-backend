// Import the app
const app = require("./app")
// Setup server port
const port = process.env.PORT || 5000

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("running server on port " + port)
})
