/**
 * Created by Saul on 04/05/2017.
 */
'use script'

const services = require('../services/tokenService');


module.exports.isauth = function(request,response, next) {
    //Para que el usuario este autorizado tiene que haber en la cabecera un campo llamado authorization

    if(!request.headers.authorization){
        response.status(403).send({message:"Acceso denegado"})
    }
    const token = request.headers.authorization.split(" ")[1];

        services.decodeToken(token)
            .then(function (response) {
                request.user = response;
                next()
            })
            .catch(response.status)


};

