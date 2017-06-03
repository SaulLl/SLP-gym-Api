'use script'
/**
 * Este es el controlador para los eventos que tiene el gymnasio
 * @author Saul Llamas Parra
 * @version 1.1
 * @since 20/04/2017
 */

//Importo el servicio de eventos
const EventService = require("../services/eventService");

/**
 * Hace una peticion al servicio de eventos para crear un nuevo evento
 * @param request
 * @param response
 */
module.exports.newEvent = function (request,response){
    /**
     * LLama al servicio newEvent para que cree el nuevo evento metiendole como parametro los datos del body
     * @type {Object}
     */
    const event = EventService.newEvent(request.body);
    /**
     * Si se cumple la llamada al servicio debelve  el objeto creado y si no debuelve un error
     */
    event.then(function (eventresult) {
        response.status(200).send({eventresult});
    }).catch(function (err) {
        response.status(400).send({message:err});
    })
};

module.exports.getEventsToday =  function (request,response) {
    /**
     * LLama al servicio getEventsToday para obtener los eventos en el dia de hoy
     * @type {Object}
     */
    const events = EventService.getEventsToday();
    events.then(function (eventsresult) {
        response.status(200).send({eventsresult});
    }).catch(function (err) {
        response.status(400).send({message:"Ha habido un error"+err});
    })
};

module.exports.getEvents =  function (request,response) {
    const events = EventService.getEvents();
    events.then(function (eventsresult) {
        response.status(200).send({eventsresult});
    }).catch(function (err) {
        response.status(400).send({message:"Ha habido un error"+err});
    })
};

module.exports.attendEvent = function (request,response) {
    let id = request.params.idEvent;
    const events = EventService.attendEvent(id,request.body);
    events.then(function (eventsresult) {
        response.status(200).send({eventsresult});
    }).catch(function (err) {
        response.status(400).send({message:"Ha habido un error"+err});
    })
};

module.exports.noAttendEvent = function (request,response) {
    let id = request.params.idEvent;
    const events = EventService.noAttendEvent(id,request.body);
    events.then(function (eventsresult) {
        response.status(200).send({eventsresult});
    }).catch(function (err) {
        response.status(400).send({message:"Ha habido un error"+err});
    })
};

module.exports.getUserEvents = function (request,response) {
    let id = request.params.idUser;
    const events = EventService.getUserEvents(id);
    events.then(function (eventsresult) {
        response.status(200).send({eventsresult});
    }).catch(function (err) {
        response.status(400).send({message:"Ha habido un error"+err});
    })
};