const q = require('q');
const constants = require('../utils/constants');
const model = require('./model');

const process = async function (data) {
    const deffered = q.defer();
    const sync = async function () {
        if (i < data.length) {
            const obj = {
                word : data[i],
            }
            const dbData = await model.get({word : data[i]},constants.collections.text);
            if (dbData && dbData.length) {
                obj.count = dbData[0].count + 1;
                returnArrUpdate.push(obj);
            } else {
                obj.count = 1;
                returnArrInsert.push(obj);
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

const add = async function (req, res) { 
    const bodyData = req.body.text.split(' ');
    const {returnArrInsert, returnArrUpdate} = await process(bodyData);
    res.status(200).send({
        code: 2000,
        messageKey: constants.messageKeys.code_2000,
    });
    if (returnArrInsert && returnArrInsert.length) {
        model.add(returnArrInsert,constants.collections.text)
    }

    if (returnArrUpdate && returnArrUpdate.length) {
        for (let i = 0; i < returnArrUpdate.length; i++) {
            model.update({word : returnArrUpdate[i].word},returnArrUpdate[i],constants.collections.text)
        }
    }
    
};

const get = async function (req, res) {
    model.get({},constants.collections.text).then(function (data) {                
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