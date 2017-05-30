//importo express
const express = require('express');
//Para definir las rutas para mediante las cuales se hacen peticiones a la API utilizo la funcion router de express
const api = express.Router();
//Importo el midelware que se utiliza para autentizicar el usuario
const auth = require('../middleware/auth');

//Importo los controladores para asignar sus funciones a las rutas
const ActivityCtrl = require('../controller/activityCtrl');
const UserCrl = require('../controller/userCtrl');
const EventCtrl = require('../controller/eventCtrl');


//peticion get mediante la cual se obtienen todas la actividades del gymnasio
api.get('/Activity',ActivityCtrl.getActivities);

//peticion get mediante la cual se obtiene una actividad determinada del gymnasio
api.get('/Activity/:activityId',ActivityCtrl.getActivity);

//peticion delete mediante la cual se borra una actividad
api.delete('/Activity/:activityId',ActivityCtrl.deleteActivity);

//peticion post mediante la cual se inserta una actividad
api.post('/Activity',ActivityCtrl.saveActivity);

//peticion put mediante la cual de actualiza una actividad
api.put('/upload/:activityId',ActivityCtrl.updateActivity);



//api.get('/eventsToday',auth.isauth,EventCtrl.getEventsToday);


api.post('/signin',UserCrl.signIn);

api.post('/signup',UserCrl.signUp);

api.post('/event',EventCtrl.newEvent);

api.get('/eventsToday',EventCtrl.getEventsToday);

api.get('/events',EventCtrl.getEvents);

api.put('/event/attend/:idEvent',EventCtrl.attendEvent);

api.put('/event/noattend/:idEvent',EventCtrl.noAttendEvent);

api.get('/events/:idUser',EventCtrl.getUserEvents);

//Exporto la configuracion de las rutas como modulo
module.exports = api;
