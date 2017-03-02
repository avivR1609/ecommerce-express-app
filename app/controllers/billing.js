//var paypal = require('../FPPayPal');
var BillingDal = require('../billingDal');
var ApiResponse = require('../models/apiResponse');

var BillingController = {
    SaveCharge : function (res, jsonData) {
        BillingDal.SaveCharge(JSON.stringify(jsonData), function () {
            res.send(ApiResponse.CreateResponse(ApiResponse.HttpStatusCodes.STATUS_OK, null));
        });
    },
    GetBillingRecords : function (res) {
        var $this = this;
        BillingDal.GetBillingRecords(function (allRecords) {
            res.send(ApiResponse.CreateResponse(ApiResponse.HttpStatusCodes.STATUS_OK, allRecords));
        });
    },
    //ProccessBilling : function (req,res) {
    //    var paypalintergation = new paypal();
    //    paypalintergation.proccessPayRequest(req, res, function (redirectUrl) {
    //        res.redirect(redirectUrl);
    //    });
    //}
};



module.exports = BillingController;