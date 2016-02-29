var fs = require('fs');
var _ = require('underscore');

module.exports = {

    create: function (data) {

        return new Promise(function (resolve, reject) {

            fs.readFile(__dirname +'/data.json', 'utf8', function (err, result) {
                if (err) {
                    return reject(err);
                }

                result = JSON.parse(result);

                var newId = 1;
                if (result.length) {
                    var maxItem = _(result).max(function (item) {
                        return item.id;
                    });
                    newId = maxItem.id + 1;
                }

                data.id = newId;
                result.push(data);

                var toStore = JSON.stringify(result);

                fs.writeFile(__dirname +'/data.json', toStore, 'utf8', function (err, result) {
                    if (err) {
                        return reject(err);
                    }

                    resolve(data);
                });
            });
        });
    },

    getAll: function () {

        return new Promise(function (resolve, reject) {

            fs.readFile(__dirname +'/data.json', 'utf8', function (err, result) {
                if (err) {
                    return reject(err);
                }

                result = JSON.parse(result);

                resolve(result);
            });
        });
    },

    getById: function (id) {

        return new Promise(function (resolve, reject) {

            fs.readFile(__dirname +'/data.json', 'utf8', function (err, result) {
                if (err) {
                    return reject(err);
                }

                result = JSON.parse(result);

                var item = _(result).findWhere({id: id});

                resolve(item);
            });
        });
    },

    updateById: function (id, data) {

        return new Promise(function (resolve, reject) {

            fs.readFile(__dirname +'/data.json', 'utf8', function (err, result) {
                if (err) {
                    return reject(err);
                }

                result = JSON.parse(result);

                var item = _(result).findWhere({id: id});

                _(item).extend(data);

                var toStore = JSON.stringify(result);

                fs.writeFile(__dirname +'/data.json', toStore, 'utf8', function (err, result) {
                    if (err) {
                        return reject(err);
                    }

                    resolve(item);
                });
            });
        });
    },

    removeById: function (id) {

        return new Promise(function (resolve, reject) {

            fs.readFile(__dirname +'/data.json', 'utf8', function (err, result) {
                if (err) {
                    return reject(err);
                }

                result = JSON.parse(result);

                var existItem = _(result).findWhere({id: id});
                if (!existItem) {
                    return reject('No se puede eliminar un item que no se encuentra en la base de datos.');
                }

                result = _(result).reject(function (item) {
                    return item.id === id;
                });

                var toStore = JSON.stringify(result);

                fs.writeFile(__dirname +'/data.json', toStore, 'utf8', function (err, result) {
                    if (err) {
                        return reject(err);
                    }

                    resolve();
                });
            });
        });
    }

};
