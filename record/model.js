const q = require('q');
const db = require('../utils/db');

const model = function () {

};

model.add = function (data,collectionName) {
    const deffered = q.defer();
    db.insert(data,collectionName).then(function (queryResult) {
        deffered.resolve(queryResult);
    }, function (err) {
        deffered.resolve([]);
    });
    return deffered.promise;
}

model.get = function (selector,collectionName) {
    const deffered = q.defer();
    db.find(selector,collectionName).then(function (queryResult) {
        deffered.resolve(queryResult);
    }, function (err) {
        deffered.resolve([]);
    });
    return deffered.promise;
}

model.update = function (selector,data,collectionName) {
    const deffered = q.defer();
    db.update(selector,{ $set: data },collectionName).then(function (updateResult) {
        deffered.resolve(updateResult);
    },function(err){
        deffered.resolve([]);
    });
    return deffered.promise;
}

module.exports = model;