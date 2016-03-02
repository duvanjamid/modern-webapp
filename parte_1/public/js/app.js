/**
 * app.js - archivo principal de la aplicación
 */

// (function () {

/**
 * manaejador de rutas de backbone
 */
var Rutas = Backbone.Router.extend({
    _contactos: null,
    routes: {
        "": "showAllContacts",
        "show-contacts": "showAllContacts",
        "new-contact": "newContact",
        "edit-contact/:id": "showContact",
    },
    showAllContacts: function () {
        this._contactos = new contactCollection();
        var _self = this;
        this._contactos.fetch({
            success: function () {
                _self.renderContacts();
            }
        });
    },
    newContact: function () {
        new createContactView();
    },
    showContact: function (params) {

    },
    renderContacts: function () {
        $('.main-body').html("");
        this._contactos.each(function (contacto, i) {
            new contactView({
                model: contacto
            });
        });
    }
});
/**
 * Modelo del objeto a manejar
 */
var contactModel = Backbone.Model.extend({
    idAttribute: 'id',
    urlRoot: '/contact',
    defaults: {
        name: 'NN',
        age: 22,
        favorite: false,
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
        // this.fetch();
    }
});

var contactView = Backbone.View.extend({
    tagName: 'div',
    template: _.template($('#template-contacto').html()),
    events: {
        'click .favorite': 'toggleFavorite',
        'click .remove': 'deleteContact'
    },
    initialize: function () {
        this.render();
        $('.main-body').append(this.$el);
        this.model.on('change', _.bind(this.render, this));
        return this;
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    toggleFavorite: function () {
        var oldFavorite = !this.model.get('favorite');
        this.model.set({
            "favorite": oldFavorite
        });
        this.model.save();
        return this;
    },
    deleteContact: function () {
        if (confirm('Esta seguro que desea eliminar este contacto')) {
            this.remove();
        }
    },
    remove:function(){
        var _self = this;
        this.$el.find('.contacto').addClass('panel-deleted').hide(800, function () {
            Backbone.View.prototype.remove.apply(_self, arguments);
            _self.model.destroy();
        });
     },




});

var createContactView = Backbone.View.extend({
    tagName: 'div',
    template: _.template($('#template-contacto-nuevo').html()),
    events: {
        'click .cancelar': 'goToAllContacts',
        // 'click .remove': 'deleteContact'
    },
    initialize: function () {
        this.render();
        $('.main-body').html(this.$el);
        return this;
    },
    render: function () {
        this.$el.html(this.template());
        return this;
    },
    goToAllContacts:function(){
         window.location.hash="show-contacts";
     },

});



var app = {
    _router: null,
    init: function () {
        /**
         * se inicia el history de backbone
         */
        Backbone.history.start();
        /**
         * se inicia el router de backbone
         */
        app._router = new Rutas();

        Backbone.history.loadUrl(Backbone.history.fragment);


    }

};


$(document).ready(function () {
    app.init();
});

// })();
