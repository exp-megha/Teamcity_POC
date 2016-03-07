
module.exports.failure = function(message, code) {
    return ({
            status: 0,
            message: message,
            code: code,
            data: null
    });
};

module.exports.success = function(msg,code,results) {
    return ({
            status: 1,
            message: msg,
            code: code,
            data: results
    });
};