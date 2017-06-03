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

/*Defino el modelo de datos para Event */
/*El modelo de datos lo defino utilizando la propiedad schema*/
const EventSchema = new Schema({
    /*evt_activity almacena un objeto tipo Activity*/
    evt_activity: {
        type: Schema.Types.ObjectId,
        ref: 'Activity'
    },
    /*evt_date almacena la fecha del evento*/
    evt_date:{
        type:Date
    },
    /*evt_place string que almacena el lugar donde se celebra el evento*/
    evt_place: {
        type:String
    },
    /*evt_users almacena un objeto tipo Users*/
    evt_users:[{
            type: Schema.Types.ObjectId,
            ref: 'User'
    }]

});

/*Exporto el modelo de mongoose para que los servicios puedan aceder a el*/
module.exports= mongoose.model('Event',EventSchema);

