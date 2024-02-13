const App = require("./app")
const BaseRoute = require("./routes/baseRoutes");


const app = new App([
    new BaseRoute()
])

app.listen()