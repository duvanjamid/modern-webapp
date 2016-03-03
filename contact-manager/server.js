var express = require('express');
var bodyParser = require('body-parser');
var reqHandler = require('./request_handler.js');
// Crear aplicación del servidor.
var app = express();

// Puerto donde va a correr el servidor.
var port = 8000;


// Habilitar que el servidor reciba datos por peticiones HTTP tipo POST y PUT.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// Conseguir la lista de todos los contactos.
app.get('/contacts', reqHandler.getContacts );


// Conseguir un solo contacto por identificador.
app.get('/contact/:id', reqHandler.getContact );


// Crear un nuevo contacto con los datos enviados por el body.
app.post('/contact', reqHandler.createContact);


// Actualizar un contacto por el identificador y los nuevos datos que llegan
// por el body.
app.put('/contact/:id', reqHandler.updateContact);


// Borrar un contacto por identificador.
app.delete('/contact/:id', reqHandler.removeContact);


// Definir la carpeta 'public' como pública.
app.use(express.static(__dirname + '/public'));


// Iniciar el servidor.
app.listen(port, function (err) {
    if (err) {
        throw err;
    }

    console.log('Servidor corriendo en http://127.0.0.1:' + port);
});
