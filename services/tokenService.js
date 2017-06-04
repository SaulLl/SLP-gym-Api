'use script'

/**
 * @summary servicio token
 * @author Saul Llamas Parra
 * @version 1.1
 * @since 20/04/2017
 */
/*Importo jwt para trabajar con json web token*/
const  jwt = require('jwt-simple');
/*Importo moment por que voy a trabajar con fechas*/
const  moment = require('moment');
/*Importo el fichero de configuracion del token*/
const  config = require('../config/TokenConfig');
/*importo mongoose para hacer la consulta a la base de datos*/
const mongoose = require('mongoose');
/*Necesito bluebird para hacer promesas*/
mongoose.Promise = require('bluebird');

/**
 * @summary createToken
 * @description funcion para crear el token al usuario
 * @param user
 */
function createToken(user) {

    const  payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(2,'years').unix()
    }

    return jwt.encode(payload,config.SECRET_TOKEN);
}

/**
 * @function decodeToken
 * @description funcion para decodificar el token al usuario
 * @param token
 */

function decodeToken(token) {
    /*
    Hago una promesa para devolver el token del uusuario
     */
    return new Promise(function (fulfill,reject) {
        try{
            const payload = jwt.decode(token,config.SECRET_TOKEN);
            if(payload.exp <= moment().unix()){
                reject({
                    status:403,
                    message:"El token ha expirado"
                })
            }

            fulfill(payload.sub);

        }catch(err){
            reject({
                status:500,
                message:"Invalid Token"
            })

        }

   });

}

module.exports = {
    createToken,
   decodeToken
};