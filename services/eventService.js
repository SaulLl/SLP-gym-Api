/**
 * @author Saúl llamas Parra
 *
 */
/*Importo el modelo de datos de Event para sealizar las consultas al modelo de eventos*/
const Event = require('../model/event');
/*Importo el modelo de datos de Activity  para popular el campo evt_activity*/
const Activity = require("../model/activity");
/*Para realizar promesas con mongoose es necesario importar el bluebird*/
const Promise = require('bluebird');
/*Para Operar con fechas importo moment*/
const moment = require('moment');
/**
 * Crear un nuevo evento
 * @param body {object} Datos que recibe mediante POST
 * @return {Object} Objeto creado
 */
module.exports.newEvent = function(body) {
    /**
     * Source es un objeto que incluira los datos necesarios para crear el evento
     * @type {{}}
     */
    let paramsNewEvent = {};
    /*Si en el cuerpo de la peticion se ha encontrado evt_activity lo meto en el array  de parametros */
    if (body.evt_activity) {
        paramsNewEvent.evt_activity = body.evt_activity;
    }
    /*Si en el cuerpo de la peticion se ha encontrado evt_date lo meto en el array  de parametros */
    if (body.evt_date){
        paramsNewEvent.evt_date =body.evt_date;
    }
    /*Si en el cuerpo de la peticion se ha encontrado evt_place lo meto en el array  de parametros */
    if (body.evt_place){
        paramsNewEvent.evt_place = body.evt_place;
    }


    return new Promise(function (fulfill, reject) {
        /*Introducco los campos del body a la base de datos*/
        /*Utilizo create de mongoose para hacer una insercion en la base de datos*/
        Event.create(paramsNewEvent, function (err, res) {
            if (err) {
                reject(err);
            }
            else {
                fulfill(res);
            }
        });
    });
};

/**
 * Obtener las actividades que hay el dia actual
 * @param params {object}
 * @return {Array} array de las actividades encontradas | Error en caso de error
 */
module.exports.getEventsToday = function () {
    //Establecco la fecha de moment a Español
    moment.locale('es');
    //
    let todaydate = moment().format();
    let tomorrow = moment().add(1,'day').format();

    let search = {"evt_date" : {"$gte" : todaydate, "$lte" : tomorrow}};

    return new Promise(function (fulfill, reject) {
        Event.find(search,function (err, events) {
            if (err) {
                reject(err);
            }
            else {
                Activity.populate(events,{path: "evt_activity"},function(err, events){
                    fulfill(events);
                });

            }
        });
    });
};

/**
 * Obtener las actividades que hay el dia actual
 * @param params {object}
 * @return {Array} array de las actividades encontradas | Error en caso de error
 */
module.exports.getUserEvents = function (id) {

    let search = {"evt_users" : id};


    return new Promise(function (fulfill, reject) {
        Event.find(search,function (err, events) {
            if (err) {
                reject(err);
            }
            else {
                Activity.populate(events,{path: "evt_activity"},function(err, events){
                    fulfill(events);
                });

            }
        });
    });
};


/**
 * Obtener todas las actividades
 * @param params {object}
 * @return {Array} array con todas las actividades | Error en caso de error
 */
module.exports.getEvents = function () {

    return new Promise(function (fulfill, reject) {
        //Con la funcion find de mongoose ha
        Event.find({},function (err, events) {
            if (err) {
                reject(err);
            }
            else {
                Activity.populate(events,{path: "evt_activity"},function(err, events){
                    fulfill(events);
                })

            }
        });
    });
};





module.exports.attendEvent = function (id,body) {
    let update = body;
    return new Promise(function (fulfill, reject) {
        Event.update({ _id: id },{$push:update}).
        exec(function (err, res) {
            if (err) {
                reject(err);
            }
            else {
                fulfill(res);
            }
        });
    });
};

module.exports.noAttendEvent = function (id,body) {
    let update = body;
    return new Promise(function (fulfill, reject) {
        Event.update({ _id: id },{$pull:update}).
        exec(function (err, res) {
            if (err) {
                reject(err);
            }
            else {
                fulfill(res);
            }
        });
    });
};

