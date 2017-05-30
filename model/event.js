'use script'
/**
 * Este archivo define el modelo de datos de Event que se encuentra almacenado en mongodb
 * @author Saul Llamas Parra
 * @version 1.1
 * @since 20/04/2017
 */

//Importo mongoose para poder operar con mongodb
const mongoose = require('mongoose');
//defino en una constante la propiedad Schema de mongoose
const Schema = mongoose.Schema;
//El modelo even va utilizar el modelo activity
const Activity = mongoose.model("Activity");
//El modelo even va utilizar el modelo user
const User = mongoose.model("User");

/*Defino el modelo de datos para Event
 * *******************************************
 * PROPIEDADES DE Event
 * *******************************************
 *   act_activity => Actividad para la que se raliza el evento
 *   act_day => Dia en el que se realiza la actividad
 *   act_hour => Imagen o video sobre la actividad
 * */
const EventSchema = Schema({
    evt_activity: {
        type: Schema.Types.ObjectId,
        ref: 'Activity'
    },
    evt_date:{
        type:Date
    },
    evt_place: {
        type:String ,
    },
    evt_users:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    }]



});

module.exports= mongoose.model('Event',EventSchema);

