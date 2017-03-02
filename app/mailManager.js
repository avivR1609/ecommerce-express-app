var MailerService = require('nodemailer');

var MailManager = {
    Send: function (data) {
        let transporter = MailerService.createTransport({
            service: 'gmail',
            auth: {
                user: 'devPurp@gmail.com',
                pass: 'devPurpusr'
            }
        });

        data = JSON.parse(data);
        var htmlBody = HtmlTemplates.ConfirmCharge.Template.replace('{0}', data.firstname).replace('{1}', data.lastname).replace('{2}', data.email).replace('{3}', data.country);
        
        let mailOptions = {
            from: '"Ecommerce express app" <devPurp@gmail.com>',
            to: data.email,
            subject: HtmlTemplates.ConfirmCharge.Subject,
            html: htmlBody
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    }
};

module.exports = MailManager;


var HtmlTemplates = {
    ConfirmCharge: {
        Subject: 'Charge Confirmation ✔',
        Template:
        '<span>This is a confirmation email for your charge:</span>'+
        '<ul>' +
        '<li>{0}' +
        '</li>' +
        '<li>{1}' +
        '</li>' +
        '<li>{2}' +
        '</li>' +
        '<li>{3}' +
        '</li>' +
        '</ul>'   
    }
};