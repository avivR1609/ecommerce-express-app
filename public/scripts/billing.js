

(function () {
    var $this;

    window.Billing = {
        dom: {
            firstNameInput: null,
            LastNameInput: null,
            emailInput: null,
            countryInput: null,
            chargeBtn: null,
            firstNameErrorMsg: null,
            lastNameErrorMsg: null,
            emailErrorMsg: null,
            countryErrorMsg: null,
            emailNotValidMsg: null
        },
        init: function () {
            $this = this;
            firstNameInput = $('#formFirstName');
            LastNameInput = $('#formLastName');
            emailInput = $('#formEmail');
            countryInput = $('#formCountry');
            chargeBtn = $('#chargeBtn');
            firstNameErrorMsg = $('#firstNameErrorMsg');
            lastNameErrorMsg = $('#lastNameErrorMsg');
            emailErrorMsg = $('#emailErrorMsg');
            countryErrorMsg = $('#countryErrorMsg');
            emailNotValidMsg = $('#emailNotValidMsg');
            chargeBtn.click($this.handleFormSubmit);
        },
        handleFormSubmit: function () {
            if ($this.validateInput()) {
                var data = {
                    firstname: firstNameInput.val(),
                    lastname: LastNameInput.val(),
                    email: emailInput.val(),
                    country: countryInput.val()
                };
                $this.callService('GET', '/savecharge', data, $this.callBackFuncs.onChargeSave);
            }
        },
        validateInput: function () {
            var isValid = false;

            if (firstNameInput.val().length > 0
                && LastNameInput.val().length > 0
                && emailInput.val().length > 0
                && countryInput.val().length > 0
                && $this.validateEmail(emailInput.val())) {
                isValid = true;
                firstNameErrorMsg.hide();
                lastNameErrorMsg.hide();
                emailErrorMsg.hide();
                countryErrorMsg.hide();
                emailNotValidMsg.hide();
            }
            else {
                if (firstNameInput.val().length <= 0) {
                    firstNameErrorMsg.show();
                }
                else {
                    firstNameErrorMsg.hide();
                }
                if (LastNameInput.val().length <= 0) {
                    lastNameErrorMsg.show();
                }
                else {
                    lastNameErrorMsg.hide();
                }
                if (emailInput.val().length <= 0) {
                    emailErrorMsg.show();
                    emailNotValidMsg.hide();
                }
                else if (emailInput.val().length > 0 && !$this.validateEmail(emailInput.val()))
                {
                    emailErrorMsg.hide();
                    emailNotValidMsg.show();
                }
                else {
                    emailErrorMsg.hide();
                    emailNotValidMsg.hide();
                }
                if (countryInput.val().length <= 0) {
                    countryErrorMsg.show();
                }
                else {
                    countryErrorMsg.hide();
                }
            }

            return isValid;
        },
        validateEmail: function (email) {
            var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(email);
        },
        callService: function (type, url, data, callback) {
            $.ajax({
                type: type,
                url: url,
                data: data,
                dataType: "json",
                success: function (res) {
                    if (typeof callback == 'function') {
                        callback();
                    }
                }
            });
        },
        callBackFuncs: {
            onChargeSave: function () {
                firstNameInput.val('');
                LastNameInput.val('');
                emailInput.val('');
                countryInput.val('');
                alert("Charge saved to levelDB, navigate to - '/records' to show all records");
            }
        }
    };
})();
$(document).ready(function () {
    window.Billing.init();
});