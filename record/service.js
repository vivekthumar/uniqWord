const q = require('q');
const constants = require('../utils/constants');
const model = require('./model');

const process = async function (data, type) {
    const deffered = q.defer();
    let dbStr = constants.collections.text;
    if(type == 'alpha') {
        dbStr = constants.collections.alpha;
    }
    const sync = async function () {
        if (i < data.length) {
            if (data[i] && data[i].trim()) {
                let obj = {
                    word : data[i].trim(),
                };
                if(type == 'alpha') {
                    obj = {
                        alpha : data[i].trim(),
                    }
                }
                const dbData = await model.get(obj,dbStr);
                if (dbData && dbData.length) {
                    obj.count = dbData[0].count + 1;
                    returnArrUpdate.push(obj);
                } else {
                    obj.count = 1;
                    returnArrInsert.push(obj);
                }
            }
            i++;
            sync();
        } else {
            deffered.resolve({returnArrInsert: returnArrInsert, returnArrUpdate: returnArrUpdate});
        }
    }
    let i = 0;
    const returnArrInsert = [];
    const returnArrUpdate = [];
    sync()
    return deffered.promise;
}

const addIndb = async function (returnArrInsert, returnArrUpdate, type) { 
    let dbStr = constants.collections.text;
    if(type == 'alpha') {
        dbStr = constants.collections.alpha;
    } 
    if (returnArrInsert && returnArrInsert.length) {
        model.add(returnArrInsert,dbStr)
    }

    if (returnArrUpdate && returnArrUpdate.length) {
        for (let i = 0; i < returnArrUpdate.length; i++) {
            let obj = {
                word : returnArrUpdate[i].word,
            };
            if(type == 'alpha') {
                obj = {
                    alpha : returnArrUpdate[i].alpha,
                }
            }
            model.update(obj,returnArrUpdate[i],dbStr);
        }
    }
}

const addword = async function (body) {
    const bodyData = body.text.split(' ');
    const {returnArrInsert, returnArrUpdate} = await process(bodyData, 'word');
    addIndb(returnArrInsert, returnArrUpdate, 'word');
};

const addalpha = async function (body) {
    const bodyData = body.text.split('');
    const {returnArrInsert, returnArrUpdate} = await process(bodyData, 'alpha');
    addIndb(returnArrInsert, returnArrUpdate, 'alpha');
};

const add = async function (req, res) { 
    res.status(200).send({
        code: 2000,
        messageKey: constants.messageKeys.code_2000,
    });
    addword(req.body);
    addalpha(req.body);    
};

const get = async function (req, res) {
    let dbStr = constants.collections.text;
    if(req.query.type == 'alpha') {
        dbStr = constants.collections.alpha;
    } 
    model.get({},dbStr).then(function (data) {                
        return res.status(200).send({
            code: 2000,
            messageKey: constants.messageKeys.code_2000,
            data: data
        });
    }, function (error) {
        return res.status(500).send(error);
    });
};


module.exports = {
    add: add,
    get: get,
};