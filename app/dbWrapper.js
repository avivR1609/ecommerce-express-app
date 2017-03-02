var levelup = require('levelup');
var cuid = require('cuid');
var db = levelup('./charges');

var dbwrapper = {
    InsertRecord: function (jsondata, callBack) {
        var newId = cuid();
        db.put(newId, jsondata);
        callBack();
    },
    GetRecords: function (callback) {
        var readStream = db.createReadStream();
        var recordsList = new Array();
        
        readStream.on('data', function (data) {
            
            var jObject = JSON.parse(data.value);
            recordsList.push(jObject);
            
        }).on('end', function () {
            callback(recordsList);
        });
    }
};

module.exports = dbwrapper;