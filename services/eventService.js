/**
 * @summary servicio para las peticiones del evento
 * @description Este archivo es el mas importante de la aplicacion por que continene la informacion sobre los eventos
 * @author Saúl llamas Parra
 *
 */
/*Importo el modelo de datos de Event para las consultas al modelo de eventos*/
const Event = require('../model/event');
/*Importo el modelo de datos de Activity  para popular el campo evt_activity*/
const Activity = require("../model/activity");
/*Para realizar promesas con mongoose es necesario importar el bluebird*/
const Promise = require('bluebird');
/*Para Operar con fechas importo moment*/
const moment = require('moment');
//Establecco la fecha de moment a Español
moment.locale('es');
/**
 * Crear un nuevo evento
 * @param body {object} Datos que recibe mediante POST
 * @return {Object} Objeto creado|eror
 */
module.exports.newEvent = function(body) {
    /**
     * paramsNewEvent es un objeto que incluira los datos necesarios para crear el evento
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
        Event.create(paramsNewEvent, function (err, eventCreated) {
            /*Si hay un error debuelvo el error*/
            if (err) {
                reject(err);
            }
            /*Si es correcto devulevo el evento creado*/
            else {
                fulfill(eventCreated);
            }
        });
    });
};

/**
 * Obtener los eventos que hay el dia actual
 * @param params {object}
 * @return {Array} array de las eventos encontrados | Error en caso de error
 */
module.exports.getEventsToday = function () {

    //Con moment devuelvo la fecha del dia actual
    let todaydate = moment().format();
    //Con moment devuelvo la fecha del dia siguiente
    let tomorrow = moment().add(1,'day').format();

    /**
     * Array que contiene la sentencia tipo json que se le envia a mongo
     * @type {Array}
     */
    let search = {"evt_date" : {"$gte" : todaydate, "$lte" : tomorrow}};

    return new Promise(function (fulfill, reject) {
        /*Debuelve los eventos organizados entre la fecha de actual y el dia siguiente*/
        Event.find(search,function (err, events) {
            if (err) {
                reject(err);
            }
            else {
               /*Si la respuesta es satisfactoria populo el campo  evt_activity
               * Para popular un campo aplico la propiedad populate que tiene los siguientes campos
               *    - Array donde se encuentra el campo a popular en este caso events
               *    - campo que se quiere popular
               * */
                Activity.populate(events,{path: "evt_activity"},function(errpopulate, events){

                    if(errpopulate){
                        reject(err);
                    }else{
                        fulfill(events);
                    }
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
    //Obtengo la fecha actual
    var today = moment();

    return new Promise(function (fulfill, reject) {
        //Con la funcion find hago una consulta a la base de datos con las actividades que hay a partir de hoy
        Event.find({"evt_date" : {"$gt" :today}},function (err, events) {
            /*Si hay error muestro el error*/
            if (err) {
                reject(err);
            }
            else {
                /*Populo el campo evt_activity para obtener la actividad como documento */

                Activity.populate(events,{path: "evt_activity"},function(err, events){
                    fulfill(events);
                })

            }
        });
    });
};




/**
 * @summary funcion para inscribirse a una actividad
 * @description Añade una identificación al array de usuarios del evento
 * @param params {object}
 * @return {Array} array con todas las actividades | Error en caso de error
 */
module.exports.attendEvent = function (id,body) {
    /*Obtiene el usuario*/
    let user = body;
    /*Esta es la promesa que devuelve*/
    return new Promise(function (fulfill, reject) {
        /*En el array de usuarios inscritos al evento inclullo event*/
        Event.update({ _id: id },{$push:user}).
        exec(function (err, res) {
            /*Si hay error muestro el error*/
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
 * @summary funcion para desapuntarse del evento
 * @description Borra una identificación de usuario a un evento
 * @param params {object}
 * @return {Array} array con todas las actividades | Error en caso de error
 */
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

