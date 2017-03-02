var payPalSdk = require('paypal-rest-sdk');
var fs = require('fs');

var FPPayPal = function () {
    this.config = {
        host: "api.sandbox.paypal.com",
        port: "",
        client_id: "AZlkytbpt-Fm8LeVn27KTXQjLjBz_V6qexS0JLSPX4KhmZDnrl1CxfU2540hSIHEz_4Og50g5TriI1Eb",
        client_secret: "EPG8gn4MghVyZnLe-l2Z_V-fEe6iCFv7d4yyYveMg0tzI15DiAraN09nKFJODqOH1BVjxrVjjt7_DPmP"
    };
    this.build();
    var executeRequest = function (sessionInfo, PayerID, callBack) {
        var response = {};

        const serverAmount = parseFloat(data.paypalData.payment.transactions[0].amount.total);
        const clientAmount = parseFloat(data.clientData.price);
        const paymentId = data.paypalData.paymentId;
        const details = {
            "payer_id": PayerID
        };

        response.userData = {
            userID: data.sessionData.userID,
            name: data.sessionData.name
        };

        if (serverAmount !== clientAmount) {
            response.error = true;
            response.message = "Payment amount doesn't matched.";
            callback(response);
        } else {

            paypal.payment.execute(paymentId, details, function (error, payment) {
                if (error) {
                    console.log(error);
                    response.error = false;
                    response.message = "Payment Error.";
                    callback(response);
                } else {
                    response.error = false;
                    response.message = "Payment Successful, but not stored.";
                    callback(response);
                };
            });
        };
    };
};

FPPayPal.prototype.proccessPayRequest = function (req, res, callBack) {
    payPalSdk.configure(this.config);
    var payment = {
        "intent": "authorize",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:1337/approved",
            "cancel_url": "http://localhost:1337/declined"
        },
        "transactions": [{
            "amount": {
                "total": "5.00",
                "currency": "USD"
            },
            "description": "Test payment"
        }]
    };

    payPalSdk.payment.create(payment, function (error, payment) {
        if (error) {
            console.log(error);
        } else {
            if (payment.payer.payment_method === 'paypal') {
                //req.session.paymentId = payment.id;
                var redirectUrl;
                for (var i = 0; i < payment.links.length; i++) {
                    var link = payment.links[i];
                    if (link.method === 'REDIRECT') {
                        redirectUrl = link.href;
                    }
                }
                callBack(redirectUrl);
            }
        }
    });
};

module.exports = FPPayPal;