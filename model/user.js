'use script'
/**
 * Este archivo define el modelo de datos de User que se encuentra almacenado en mongodb
 * @author Saul Llamas Parra
 * @version 1.1
 * @since 20/04/2017
 */

//Importo mongoose para poder operar con mongodb
const mongoose = require('mongoose');

require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

//defino en una constante la propiedad Schema de mongoose
const Schema = mongoose.Schema;

/*Defino el modelo de datos para User
 * *******************************************
 * PROPIEDADES DE USER                       *
 * *******************************************
 *user_loginName => Nombre con el que se logea el usuario (unico)
 *user_passwordSHA2 => Contraseña del usuario cifrada en SHA2
 *user_name => Nombre del usuario
 *user_surnames => Apellidos del usuario
 *user_sex => sexo del usuario
 *user_birhdate => Fecha de nacimiento
 *user_weight => Peso del usuario
 *user_height => Altura del usuario
 *
 */
const ActivitySchema = Schema({
    user_loginName:{
        type:String,
        unique:true
    },
    user_passwordSHA2:{
        type:String
    },
    user_name:{
        type:String
    },
    user_surnames:{
        type:String
    },
    user_sex:{
        type:String,
        enun:['Hombre','Mujer']
    },
    user_birhtdate:{
        type:Date
    },
    user_weight:{
        type:SchemaTypes.Double
    },
    user_height:{
        type:Number ,
        default:0
    }
});

//Exporto el modelo de datos de mongo para que pueda ser administrado por el controlador
module.exports= mongoose.model('User',ActivitySchema);
