/**
 * Modelo en backbone
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
    },
    initialize: function (params) {
        console.log('this model has been initialized');
    }
});


/**
 * ColecciÃ³n en backbone
 */
var contactCollection = Backbone.Collection.extend({
    model: contactModel,
    urlRoot: '/contacts',
    initialize: function () {
        this.fetch();
    }
});


var contactView = Backbone.View.extend({
    events: {
        'click .edit': 'editContact'
    },
    initialize: function () {

    }
});
