/**
 * @author Saúl llamas Parra
 *
 */
const Event = require('../model/event');
const Activity = require("../model/activity");
const User = require("../model/user");
const Promise = require('bluebird');
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
    let source = {};

    if (body.evt_activity) {
        source.evt_activity = body.evt_activity;
    }
    if (body.evt_date){
        source.evt_date =body.evt_date;
    }
    if (body.evt_place){
        source.evt_place = body.evt_place;
    }


    return new Promise(function (fulfill, reject) {
        Event.create(source, function (err, res) {
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

    moment.locale('es');

    let todaydate = moment().format();
    let tomorrow = moment().add(1,'day').format();

    let search = {"evt_date" : {"$gte" : todaydate, "$lte" : tomorrow}};

    return new Promise(function (fulfill, reject) {
        Event.find(search,function (err, inscriptions) {
            if (err) {
                reject(err);
            }
            else {
                Activity.populate(inscriptions,{path: "evt_activity"},function(err, inscriptions){
                    fulfill(inscriptions);
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
                fulfill(events)
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
        Event.find({},function (err, inscriptions) {
            if (err) {
                reject(err);
            }
            else {
                Activity.populate(inscriptions,{path: "evt_activity"},function(err, inscriptions){
                    fulfill(inscriptions);
                });

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

