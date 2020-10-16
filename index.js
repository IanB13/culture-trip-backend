// Import the app
const app = require("./app")
const config = require("./utils/config")
// Setup server port
const port = config.PORT

// Launch app to listen to specified port
app.listen(port, () => {
    console.log("running server on port " + port)
})
