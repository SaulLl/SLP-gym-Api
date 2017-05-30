'use script'
/**
 * Este es el controlador para los usuarios
 * @author Saul Llamas Parra
 * @version 1.1
 * @since 20/04/2017
 */

//Importo el modelo del usuario
const User = require('../model/user');

const service = require('../services/tokenService');

/**
 *
 * @param request
 * @param response
 */

function signUp(request,response) {
    const user = new User({
        user_loginName:request.body.user_loginName,
        user_passwordSHA2:request.body.user_passwordSHA2,
        user_name: request.body.user_name,
        user_surnames:request.body.user_surnames,
        user_sex: request.body.user_sex,
        user_birhtdate:request.body.user_birhtdate,
        user_weight:request.body.user_weight,
        user_height:request.body.user_height
    });

    user.save(function(err) {
        if(err){
            response.status(500).send({message:'error al crear el usuario: '+err});
        }

        return response.status(200).send({token:service.createToken(user)})
    });
}

/**
 *
 * @param request
 * @param response
 */
function signIn(request,response) {
    let empty = true

    //Hago una consulta a la base de datos para combrobar que existe el usuario
     User.find( { $or: [ { user_loginName:request.body.user_loginName }, { user_passwordSHA2: { $lt:request.body.user_passwordSHA2}}]},
         function (err,userresult) {


     //Si ha habido un error
     if(err){
         response.status(500).send({message:"Error en el servidor "+err});
     }

     for (let i in userresult){
        empty = false;
     }
     if(empty){
         response.status(403).send({message:"Usuario incorrecto "});
     }
     if(userresult && !empty){
         //request.user = userresult;
         response.status(200).send({
         message:"Usuario correcto ",
         user:userresult,
         access_token:service.createToken(userresult)
     });
     }
     })
}

module.exports = {
    signUp,
    signIn
};
