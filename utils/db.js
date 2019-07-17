const q = require('q');
const uuid = require('node-uuid');
const db = require('./mongo-db');
let dbconn;
db.conn(function(err,db){
    if(!err){
        dbconn = db;
    }
});


const _find = function (selector,collectionName) {
    const deffered = q.defer();
    function innerQuery(){
        const collection = dbconn.collection(collectionName);
        collection.find(selector).toArray(function(err, docs) {
            if(err){
                deffered.reject(err);
            }else{
                if(docs.length){
                    deffered.resolve(docs);
                }else{
                  deffered.reject({});  
                }
                
            }
        })
    }
    if(dbconn == null){
        db.conn(function(err,dbInstance){
            if(err){
                deffered.reject(err);
            }else{
                dbconn = dbInstance;
                innerQuery()
            }
        });
    }else{
        innerQuery()
    }
    return deffered.promise;
};
//_find({},'text')

/*
    * data must be in array [{},{}]
*/
const _insert = function (data, collectionName) {
    const deffered = q.defer();
    function innerQuery(){
        const collection = dbconn.collection(collectionName);
        collection.insertMany(data, function(err, result) {
            if(err){
                deffered.reject(err);
            }else{
                deffered.resolve(true);
            }
          });
    }
    if(dbconn == null){
        db.conn(function(err,dbInstance){
            if(err){
                deffered.reject(err);
            }else{
                dbconn = dbInstance;
                innerQuery()
            }
        });
    }else{
        innerQuery()
    }
    return deffered.promise;
};

const _delete = function (selector, collectionName) {
    const deffered = q.defer();
    function innerQuery(){
        const collection = dbconn.collection(collectionName);
        collection.remove(selector, function(err, result) {
            if(err){
                deffered.reject(err);
            }else{
                deffered.resolve(true);
            }
          });
    }
    if(dbconn == null){
        db.conn(function(err,dbInstance){
            if(err){
                deffered.reject(err);
            }else{
                dbconn = dbInstance;
                innerQuery()
            }
        });
    }else{
        innerQuery()
    }
    return deffered.promise;
};
// _delete({},'alpha')
// _delete({},'text')
const _update = function (selector,set, collectionName) {
    const deffered = q.defer();
    function innerQuery(){
        const collection = dbconn.collection(collectionName);
        collection.updateMany(selector,set, function(err, result) {
            if(err){
                // console.log('err',err)
                deffered.reject(err);
            }else{
                // console.log('result',result)
                deffered.resolve(true);
            }
          });
    }
    if(dbconn == null){
        db.conn(function(err,dbInstance){
            if(err){
                deffered.reject(err);
            }else{
                dbconn = dbInstance;
                innerQuery()
            }
        });
    }else{
        innerQuery()
    }
    return deffered.promise;
};

const _aggregate = function (selector,collectionName) {
    const deffered = q.defer();
    function innerQuery(){
        const collection = dbconn.collection(collectionName);
        collection.aggregate(selector).toArray(function(err, docs) {
            if(err){
                deffered.reject(err);
            }else{
                if(docs.length){
                    deffered.resolve(docs);
                }else{
                  deffered.reject({});  
                }
                
            }
        })
    }
    if(dbconn == null){
        db.conn(function(err,dbInstance){
            if(err){
                deffered.reject(err);
            }else{
                dbconn = dbInstance;
                innerQuery()
            }
        });
    }else{
        innerQuery()
    }
    return deffered.promise;
};

const _getUUID = function () {
    return uuid.v4().replace(/\-/g,'');
};


module.exports = { 
    getUUID: _getUUID,
    find : _find,
    insert : _insert,
    delete : _delete,
    update : _update,
    aggregate : _aggregate
};