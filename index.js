'use script'
/**
 * Este es el archivo que cargara la aplicación
 * @author Saul Llamas Parra
 * @since 15-04-2017
 * @version 2.1
 */

//Cargo el archivo de configuracion de express que esta en el directorio de la configuración
const app = require('./app');


/*
  Importo mongoose para realizar las operaciones con la  base de datos de mongo
*/
const mongoose = require('mongoose');

mongoose.Promise= require('bluebird');

//Guardo el puerto que voy a utilizar en una constante
const port = 3000;

mongoose.connect('mongodb://localhost:27017/gym',function(error,response) {
    if(error){
        console.log("Error al realizar la conesion con mongodb "+error)
    }else {
        console.log("conexion establecida");
    }

    //app escuchara por el puerto 3000
    app.listen(port,function () {
        console.log('API rest corriendo en http://localhost:'+port);
    });

});






