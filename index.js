'use script'
/**@summary fichero de carga
 * @description Este es el archivo que cargara la aplicación
 * @author Saul Llamas Parra
 * @since 15-04-2017
 * @version 2.1
 */

//Cargo el archivo de configuracion de express que esta en el directorio de la configuración
const express = require('./config/expressConfig');
//Cargo el archivo de puertos
const ports = require('./config/ports');
//Cargo el fichero de configuracion de la base de datos
const dbconf = require('./config/mongooseConfig')

/*
  Importo mongoose para realizar las operaciones con la  base de datos de mongo
*/
const mongoose = require('mongoose');

mongoose.Promise= require('bluebird');


    //Utilizo la propiedad listen de express para indicarle por que puerto tiene que escuchar
    //Acedo a la variable portExpress para saber en que puerto esta configurado
    express.listen(ports.portExpress,function() {
        //Muestro el mensaje de que la API esta corriendo
        console.log('API rest corriendo en http://localhost:'+ ports.portExpress);
    });



mongoose.connect('mongodb://'+dbconf.dns+':'+ports.portMongo+'/'+dbconf.db,function(error,response) {
    /*Si ha habido un error muestro el mensaje de error*/
    if(error){
        console.log("Error al realizar la conesion con mongodb "+error);
    /*Si no ha habido error muestro un mensaje satisfactorio*/
    }else {
        console.log("conexion establecida");
    }



});






