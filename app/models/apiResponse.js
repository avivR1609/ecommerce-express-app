
var ApiResponse = {
    
    HttpStatusCodes : {
        STATUS_OK: 200
    },
    CreateResponse: function (code, Data) {
        var apiRes = {
            statuscode: code,
            data: Data
        };

        return apiRes;
    }
};

module.exports = ApiResponse;