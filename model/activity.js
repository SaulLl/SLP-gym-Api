'use script'
/**
 * Este archivo define el modelo de datos de Activity que se encuentra almacenado en mongodb
 * @author Saul Llamas Parra
 * @version 1.1
 * @since 20/04/2017
 */

//Importo mongoose para poder operar con mongodb
const mongoose = require('mongoose');
//defino en una constante la propiedad Schema de mongoose
const Schema = mongoose.Schema;

/*Defino el modelo de datos para Activity
* *******************************************
* PROPIEDADES DE ACTIVITY
* *******************************************
*   act_name => Nombre de la actividad
*   act_description => Descripción de la actividad
*   act_intensy => intensidad de la actividad
*   act_duration => duracion de la actividad
* */
const ActivitySchema = Schema({
    act_name:{
        type:String,
        unique:true
    },
    act_description:{
        type:String
    },
    act_image:{
        type:String
    },
    act_intensy:{
        type:String ,
        enun: ['Baja','Media','Alta']
    },
    act_duration:{
        type:Number ,
        default:0
    }
});

module.exports= mongoose.model('Activity',ActivitySchema);

