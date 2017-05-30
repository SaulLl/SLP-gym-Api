'use script'
/**
 * Este es el controlador para los eventos que tiene el gymnasio
 * @author Saul Llamas Parra
 * @version 1.1
 * @since 20/04/2017
 */

const EventService = require("../services/eventService");
const Even = require("../model/event");


module.exports.newEvent = function (request,response){
    const event = EventService.newEvent(request.body);
    event.then(function (eventresult) {
        response.status(200).send({eventresult});
    }).catch(function (err) {
        response.status(400).send({message:err});
    })
};

module.exports.getEventsToday =  function (request,response) {
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