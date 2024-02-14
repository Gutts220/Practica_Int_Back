const App = require("./app")
const BaseRoute = require("./routes/baseRoutes");
const StudentsRoute = require("./routes/studentRoutes");


const app = new App([
    new BaseRoute(),
    new StudentsRoute(),
])

app.listen();