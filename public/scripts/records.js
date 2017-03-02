

(function () {
    var $this;
    var recordHtmlTemplate = '<div class=\"billRecord\"><span>Record {4}</span><ul><li>{0}</li><li>{1}</li><li>{2}</li><li>{3}</li></ul></div>';

    window.Records = {
        dom: {
            records: null
        },
        init: function () {
            $this = this;
            records = $('#records');
            $this.getRecords();
        },
        getRecords: function () {
            var callBack = function () {
            };
            $this.callService('GET', '/getrecords', '', $this.callBackFuncs.handleGetRecordsCall);
        },
        callService: function (type, url, data, callback) {
            $.ajax({
                type: type,
                url: url,
                data: data,
                dataType: "json",
                success: function (res) {
                    if (typeof callback == 'function') {
                        callback(res.data);
                    }
                }
            });
        },
        callBackFuncs: {
            handleGetRecordsCall: function (res) {
                var allRecords = '';
                for (var i = 0; i < res.length; i++) {
                    var email = res[i].email.length >= 16 ? res[i].email.substring(0, 12) + '...' : res[i].email;
                    allRecords += recordHtmlTemplate.replace('{0}', res[i].firstname)
                        .replace('{1}', res[i].lastname)
                        .replace('{2}', email)
                        .replace('{3}', res[i].country)
                        .replace('{4}', i + 1);
                }
                if (allRecords.length <= 0) {
                    records.html('<span class=\"emptyRecords\">No records for now</span>');
                }
                else {
                    records.html(allRecords);
                }
                
            }
        }
    };
})();
$(document).ready(function () {
    window.Records.init();
});