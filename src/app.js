const express = require('express');
const displayRoutes = require('express-routemap');
const handlebars = require('express-handlebars');
const { mongoDBconnection } = require('./db/mongoConfig');


const API_VERSION = "v1"

class app{
   app;
   env;
   port;
   server;

   constructor(routes){
    this.app = express();
    this.env = "development";
    this.port = 5000;
    
    this.connoctToDatabase();
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeHandlerbars();
   }


   getServer(){
    return this.app;
   }

   closeServer(){
     this.server = this.app.listen(this.port,()=>{
        done();
     })
   }

   async connoctToDatabase(){
      //TODO: Inicializar la conexion
      await mongoDBconnection()
   }

   initializeRoutes(routes){
     routes.forEach((route) => {
        this.app.use(`/api/${API_VERSION}`, route.router)
     });
   }
    
   initializeMiddleware(){
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true}));
    this.app.use("/static", express.static(`${__dirname}/public`))
   }

   initializeHandlerbars(){
    this.app.engine("handlebars", handlebars.engine());
    this.app.set("views", __dirname + "/views");
    this.app.set("view engine", "handlebars");
   }

   listen(){
    this.app.listen(this.port, ()=>{
        displayRoutes(this.app);
        console.log(`======================================`)
        console.log(` === ENV: ${this.env}`)
        console.log(` === PORT: ${this.port}`)
        console.log(`======================================`)
    });
   }
}

module.exports = app