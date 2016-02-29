/**
 * app.js - archivo principal de la aplicación
 */

(function () {

    /**
     * manaejador de rutas de backbone
     */
    var router = new Backbone.Router.extend({
        routes: {
            "": "showAllContacts",
            "show-contacts": "showAllContacts",
            "new-contact": "newContact",
            "contact/:id": "showContact",
        },
        showAllContacts: function () {

        },
        newContact: function () {


        },
        showContact: function (params) {

        }
    });
    Backbone.sync = function (method, model) {
        console.log(method + ": " + JSON.stringify(model));
        // model.set('id', 1);
    };
    /**
     * Modelo del objeto a manejar
     */
    var contactModel = Backbone.Model.extend({
        idAttribute: 'id',
        urlRoot: '/contact',
        defaults: {
            id: 'null',
            name: 'NN',
            age: 22,
            address: 'Cra 27 calle 9 - ciudad universitaria ',
            phone: '6344000',
            email: "email@uis.edu.co",
            photo: '/images/avatar.png'
        }
    });

    var contactCollection = Backbone.Collection.extend({
        model: contactModel,
        url: '/contacts',
        initialize: function () {
            this.fetch();
        }
    });

    $(document).ready(function () {
        var juan = new contactModel();
        juan.save();
        var contactos = new contactCollection();
        console.log(contactos.toJSON());
    });

})();
