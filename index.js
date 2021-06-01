// Creamos una variable express para el desarrollo web
var express = require("express");
var app = express();

//Para jugar con rutas usamos el modulo path

var path = require("path");

//Para habilitar las peticiones externas

var cors = require('cors');

app.use(cors());

// Creamos una variable dataBase para la gestion de bases de datosV2

var dataBase = require("nedb");

var educationExpenditures_DB = new dataBase({filename: path.join(__dirname,"./education_expenditures/dataBaseEdex.db"), autoload: true});
var educationExpenditures_DB_Reduced = new dataBase({filename: path.join(__dirname,"./education_expenditures/dataBaseEdexReduced.db"), autoload: true});

//Definimos el puerto al que estará asociado el servidor web

var port = process.env.PORT || 10000;

app.use(express.json());

//Definimos el path inicial de la API

var BASE_API_PATH = "/api/v1";

// Api Manuel González Regadera - education_expenditures

var education_expenditures_api = require("./education_expenditures");
education_expenditures_api.register(app,BASE_API_PATH, educationExpenditures_DB, educationExpenditures_DB_Reduced);


//Ponemos el servidor a escuchar

app.listen(port, () =>{
    console.log("Server ready to listen on port " + port);
});