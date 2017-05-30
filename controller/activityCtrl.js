'use script'
/**
 * @author Saul Llamas Parra
 */

const Activity = require('../model/activity');

function getActivity(request,response){
    let activityid = request.params.activityId;

    Activity.findById(activityid , function (error, activityresult) {
        if(error){
            response.status(500).send({messsaje:"Error al realizar la petición "+error});
        }
        if(!activityresult){
            response.status(404).send({messaje:"No se encontraron actividades"});
        }
        if(activityresult){
            response.status(200).send({activity:activityresult});
        }
    });
}

function updateActivity(request,response){
    let activityid = request.params.activityId;
    let activityUpdate = request.body;
    Activity.findByIdAndUpdate(activityid,activityUpdate ,function (error, activityupdated) {
        if (error) {
            response.status(500).send({messsaje: "Error al actualizar el producto el producto con la id" + activityid + " : \n" + error});
        }
        if (!activityupdated) {
            response.status(404).send({messaje: "No se encontraron actividades"});
        }
        if (activityupdated) {
            response.status(200).send({activity: activityupdated});
        }
    })
}

function deleteActivity(request,response){
    let activityid = request.params.activityId;

    Activity.findById(activityid , function (error, activityresult) {
        if(error){
            response.status(500).send({messsaje:"Error al borrar el producto con la id"+ activityid+" : \n"+ error});
        }
        if(!activityresult){
            response.status(404).send({messaje:"No se encontraron actividades"});
        }
        if(activityresult){
            activityresult.remove(function(error) {
                    if (!error) {
                        response.status(200).send({messaje: "La actividad se elimino correctamente"});
                    } else {
                        response.status(500).send({messsaje: "Error al borrar el producto con la id" + activityid + " : \n" + error});
                    }
                }
            )};
    });
}

/**
 * @description Obtiene todas las actividades
 * @param request
 * @param response
 */
function getActivities(request,response){
    Activity.find({} , function (error, activityresult) {
        if(error){
            response.status(500).send({messsaje:"Error al realizar la petición "+error});
        }
        if(!activityresult){
            response.status(404).send({messaje:"No se encontraron actividades"});
        }
        if(activityresult){
            response.status(200).send({activities:activityresult});
        }
    });
}

function saveActivity(request,response) {

    //todo Seria conveniente crear Promesa

    let activity = new Activity()
    activity.act_name = request.body.act_name;
    activity.act_description = request.body.act_description;
    activity.act_image = request.body.act_image;
    activity.act_intensy = request.body.act_intensy;
    activity.act_duration = request.body.act_duration;


    activity.save(function(error,ActivityStored) {
        if(error){
            response.status(500).send({message:'Error al introducir actividad: '+error});
        }else{
            response.status(200).send(ActivityStored);
        }
    })
}


module.exports = {
    getActivity,
    updateActivity,
    deleteActivity,
    getActivities,
    saveActivity
}