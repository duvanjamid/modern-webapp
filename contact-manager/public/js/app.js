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
        "view-contact/:id": "viewContact",
        "edit-contact/:id": "editContact"
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
    viewContact: function (id) {
        var _self = this;
        var contacto = new contactModel({
            id: id
        });
        contacto.fetch({
            success: function () {
                new showContactView({
                    model: contacto
                });
            }
        });
    },
    editContact: function (id) {
        var _self = this;
        var contacto = new contactModel({
            id: id
        });
        contacto.fetch({
            success: function () {
                new createContactView({
                    model: contacto
                });
            }
        });
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
        age: 0,
        favorite: false,
        address: 'no registrada ',
        phone: '--- ---- --- ',
        email: "",
        photo: '/images/avatar.png'
    }
});
/**
 * coleccion de contactos
 */
var contactCollection = Backbone.Collection.extend({
    model: contactModel,
    url: '/contacts',
    initialize: function () {
        // this.fetch();
    }
});
/**
 * vista miniatura de un contacto
 */
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
    remove: function () {
        var _self = this;
        this.$el.find('.contacto').addClass('panel-deleted').hide(800, function () {
            Backbone.View.prototype.remove.apply(_self, arguments);
            _self.model.destroy();
        });
    },
});
/**
 * Vista en detalle de un contacto
 */
var showContactView = Backbone.View.extend({
    tagName: 'div',
    template: _.template($('#template-contacto-full').html()),
    events: {
        'click .favorite': 'toggleFavorite',
        'click .volver': 'goToAllContacts'
    },
    initialize: function () {
        this.render();
        $('.main-body').html(this.$el);
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
    goToAllContacts: function () {
        app._router.navigate('show-contacts', {
            trigger: true
        });
    }
});
/**
 * vista para crear un contacto -- formulario
 */
var createContactView = Backbone.View.extend({
    tagName: 'div',
    template: _.template($('#template-contacto-nuevo').html()),
    events: {
        'click .cancelar': 'goToAllContacts',
        'click .enviar': 'saveContact'
    },
    initialize: function () {
        this.render();
        $('.main-body').html(this.$el);
        return this;
    },
    render: function () {
        if (this.model) {
            this.$el.html(this.template(this.model.toJSON()));
        } else {
            this.$el.html(this.template({}));
        }
        return this;
    },
    goToAllContacts: function () {
        app._router.navigate('show-contacts', {
            trigger: true
        });
    },
    saveContact: function () {
        if (this.validar()) {
            var name = this.$el.find('#name').val();
            var email = this.$el.find('#email').val();
            var address = this.$el.find('#address').val();
            var phone = this.$el.find('#phone').val();
            var photo = this.$el.find('#photo').val();
            var age = this.$el.find('#age').val();
            var favorite = this.$el.find('#favorite').is(':checked');

            if (this.model) { // se esta editando
                this.model.set({
                    name: name,
                    email: email,
                    address: address,
                    phone: phone,
                    photo: photo,
                    age: age,
                    favorite: favorite
                });
                this.model.save();
                // muestra mensaje de creacion de contacto
                $.snackbar({
                    content: "Se ha modificado el contacto", // text of the snackbar
                    style: "toast", // add a custom class to your snackbar
                    timeout: 3000 // time in milliseconds after the snackbar autohides, 0 is disabled
                }).snackbar('show');

            } else { // se esta creando un contacto
                var newContact = new contactModel({
                    name: name,
                    email: email,
                    address: address,
                    phone: phone,
                    photo: photo,
                    age: age,
                    favorite: favorite
                });
                newContact.save();
                // muestra mensaje de creacion de contacto
                $.snackbar({
                    content: "Se ha creado el contacto", // text of the snackbar
                    style: "toast", // add a custom class to your snackbar
                    timeout: 3000 // time in milliseconds after the snackbar autohides, 0 is disabled
                }).snackbar('show');
                app._router.navigate('show-contacts', {
                    trigger: true
                });
            }

        }
    },
    validar: function () {
        var name = this.$el.find('#name').val();
        if (!/\w/gi.test(name)) {
            alert('Debe digitar un nombre ');
            return false;
        }
        var email = this.$el.find('#email').val();
        if (email.indexOf('@') < 0) {
            alert('Debe digitar un email valido');
            return false;
        }
        var photo = this.$el.find('#photo').val();
        if (photo.indexOf('/') < 0) {
            alert('Debe agregar una foto ');
            return false;
        }
        return true;
    }
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
