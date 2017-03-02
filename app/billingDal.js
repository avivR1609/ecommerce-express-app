var dbWrapper = require('./dbWrapper');
var MailManager = require('./mailManager');

var billingdal = {
    SaveCharge: function (jsondata, callBack) {
        dbWrapper.InsertRecord(jsondata, function () {
            MailManager.Send(jsondata);
            callBack();
        });
    },
    GetBillingRecords: function (callback) {
        dbWrapper.GetRecords(callback);
    }
};

module.exports = billingdal;