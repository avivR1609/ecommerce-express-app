var BillingController = require('./controllers/billing');
var path = require('path');
var url = require('url');



module.exports = function (app) {
    //app.use(function (req, res, next) {
    //    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1337');
    //    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    //    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    //    //res.setHeader('Access-Control-Allow-Credentials', true);
    //    //next();
    //});

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/views', 'HomePage.html'));
    });
    app.get('/billing', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/views', 'BillingPage.html'));
    });
    app.get('/savecharge', function (req, res, next) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        var jsonData = {
            firstname: query.firstname,
            lastname: query.lastname,
            email: query.email,
            country: query.country
        };

        BillingController.SaveCharge(res, jsonData);
    });
    app.get('/records', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/views', 'Records.html'));
    });
    app.get('/getrecords', function (req, res,next) {

        BillingController.GetBillingRecords(res);
    });
    //app.get('/processbilling', function (req, res, next) {
    //    var billing = new BillingController(req, res, next);
    //    billing.ProccessBilling();
    //});
    //app.get('/approved', function (req, res) {
    //    var sessionInfo = req.session;
    //    var response = {};
    //    const PayerID = req.query.PayerID;
    //    if (typeof sessionInfo.sessionData == "undefined" || sessionInfo.sessionData == "") {
    //        res.redirect("/");
    //        res.end();
    //    } else {
    //        sessionInfo.state = "success";
    //        paypal.executeRequest(sessionInfo, PayerID, function (response) {
    //            res.send(response);
    //        });
    //    };
    //});
    //app.get('/declined', function (req, res) {
    //});
};



