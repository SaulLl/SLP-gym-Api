'use script'

/**
 * @summary Fichero de documentacion de express
 * @description El siguiente archivo contiene la configuracion del framework express
 * @author Saul LLamas Parra
 * @since 28-04-2017
 * @version 1.1
 */
/*
 Importo express
 express => Framework que va a facilitar la comunicaion http
 Al importarlo con require busca el archivo de carga en la carpeta node modules
 */
const Express = require('express');

/*
Defino el puerto por el que emite express en una variable
 */
module.exports.portExpress = 3000;

/*
 Importo body-Parser
 body-Parser => Parseara los datos para que se puedan trabajar con ellos
 Al importarlo con require busca el archivo de carga en la carpeta node modules
 */
const bodyParser = require('body-parser');


//Declaro una constante express que utilizara expressConfig
const express = Express();


//express usara bodyParser
express.use(bodyParser.urlencoded({extended :true}));


//bodyParser.json() Permitira utilizar json en las paticiones
express.use(bodyParser.json());




/*
 Configuracion de las peticiones que se hagan desde el navegador web
*/
express.use(function (request,response,next) {
    response.header('Access-Control-Allow-Origin','*');
    /*Permite realizar las peticiones GET , POST , PUT , DELETE*/
    response.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    /*Permite enviar el tipo de contenido en la cabecera desde el navegador*/
    response.header('Access-Control-Allow-Headers','Content-Type');
    next();
});


const apiroutes  = require('../apiRoutes/routes');
express.use('/api',apiroutes);

module.exports = express;
