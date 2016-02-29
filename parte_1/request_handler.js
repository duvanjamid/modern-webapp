/**
 * Manejador de peticiones http para el API-REST
 */

var database = require('./database');


module.exports = {
    /**
     * Administrador de la paticion GET de todos los contactos
     */
    getContacts: function (req, res) {
        database
            .getAll()
            .then(function (results) {
                    res.json({
                        success: true,
                        data: results
                    });
                },
                function (err) {
                    res.json({
                        error: err
                    });
                });
    },
    /**
     * Administrador de la peticion GET de un contacto por id
     */
    getContact: function (req, res) {

        var id = Number(req.params.id);

        database
            .getById(id)
            .then(function (contact) {
                    if (contact) {
                        res.json({
                            success: true,
                            data: contact
                        });
                    } else {
                        res.json({
                            error: 'No encontrado.'
                        });
                    }
                },
                function (err) {
                    res.json({
                        error: err
                    });
                });
    },
    /**
     * Administrador de la peticion POST para crear un contacto
     */
    createContact: function (req, res) {

        var name = req.body.name;
        var age = Number(req.body.age);
        var address = req.body.address;
        var phone = req.body.phone;
        var email = req.body.email;
        var photo = req.body.photo;
        
        var newContact = {
            name: name,
            age: age,
            address: address,
            phone: phone,
            email: email,
            photo: photo
        };

        database
            .create(newContact)
            .then(function (contact) {
                    res.json({
                        success: true,
                        data: contact
                    });
                },
                function (err) {
                    res.json({
                        error: err
                    });
                });
    },
    /**
     * Administrador de la peticion PUT para actualizar un contacto
     */
    updateContact: function (req, res) {

        var id = Number(req.params.id);
        var name = req.body.name;
        var age = Number(req.body.age);

        var updateData = {
            name: name,
            age: age
        };

        database
            .updateById(id, updateData)
            .then(function (contact) {
                    res.json({
                        success: true,
                        data: contact
                    });
                },
                function (err) {
                    res.json({
                        error: err
                    });
                });
    },
    /**
     * Administrador de la peticion DELETE para eliminar un contacto
     */
    removeContact: function (req, res) {

        var id = Number(req.params.id);

        database
            .removeById(id)
            .then(function () {
                    res.json({
                        success: true
                    });
                },
                function (err) {
                    res.json({
                        error: err
                    });
                });
    }
};
