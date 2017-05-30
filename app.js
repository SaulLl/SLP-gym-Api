/**
 * @description El siguiente archivo contiene la configuracion del framework express
 * @author Saul LLamas Parra
 * @since 28-04-2017
 * @version 1.1
 */
/*
 Importo express
 express => Framework que va a facilitar la comunicaion http
 */
const express = require('express');


/*
 Importo body-Parser
 body-Parser => Parseara los datos para que se puedan trabajar con ellos
 */
const bodyParser = require('body-parser');


//Declaro una constante app que utilizara expressConfig
const app = express();


//app usara bodyParser
app.use(bodyParser.urlencoded({extended :true}));


//bodyParser.json() Permitira utilizar json en las paticiones
app.use(bodyParser.json());


/*La siguiente funcion hace que desde el navegador se pueda aceder a los datos de esta API REST mediante http
 utilizando los siguientes metodos
 GET => Para obtener datos de la API
 POST => Para mandar datos a la API
 PUT => Actualizar datos de la API
 DELETE => Borrar datos de la API
 */
app.use(function (request,response,next) {
    response.header('Access-Control-Allow-Origin','*');
    response.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    response.header('Access-Control-Allow-Headers','Content-Type');
    next();
});

const apiroutes  = require('./apiRoutes/routes');
app.use('/api',apiroutes);

module.exports = app;