const q = require('q');
const constants = require('../utils/constants');
const model = require('./model');
const logger = require('../utils/logger');

const process = async function (data, type) {
    const deffered = q.defer();
    let dbStr = constants.collections.text;
    if(type == 'alpha') {
        dbStr = constants.collections.alpha;
    }
    const sync = async function () {
        if (i < data.length) {
            logger.info(util.format('Process On :%s', data[i]));
            if (data[i] && data[i].trim()) {
                let obj = {
                    word : data[i].trim(),
                };
                if(type == 'alpha') {
                    obj = {
                        alpha : data[i].trim(),
                    }
                }
                let selector = {
                    word : data[i].trim(),
                }

                if(type == 'alpha') {
                    selector = {
                        alpha : data[i].trim(),
                    }
                }
                const dbData = await model.get(obj,dbStr);
                if (dbData && dbData.length) {
                    obj.count = dbData[0].count + 1;
                    // returnArrUpdate.push(obj);
                    await model.update(selector,obj,dbStr);
                    i++;
                    sync();
                } else {
                    obj.count = 1;
                    await model.add([obj],dbStr)
                    // returnArrInsert.push(obj);
                    i++;
                    sync();
                }
            } else {
                i++;
                sync();
            }
            
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

const addword = async function (body) {
    const deffered = q.defer();
    const bodyData = body.text.split(' ');
    await process(bodyData, 'word');
    deffered.resolve(true);
    return deffered.promise;
};

const addalpha = async function (body) {
    const deffered = q.defer();
    const bodyData = body.text.split('');
    await process(bodyData, 'alpha');
    deffered.resolve(true);
    return deffered.promise;
};

const add = async function (req, res) {
    const deffered = q.defer(); 
    q.all([addword(req.body),addalpha(req.body)]).then(() => {
        res.status(200).send({
            code: 2000,
            messageKey: constants.messageKeys.code_2000,
        });
    },() => {
        return res.status(500).send();
    })
    
    return deffered.promise;
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