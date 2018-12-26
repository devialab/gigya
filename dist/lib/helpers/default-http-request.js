"use strict";
var request = require("request");
var fs = require("fs");
var path = require("path");
var certificate;
function getCertificate() {
    if (!certificate) {
        certificate = fs.readFileSync(path.join(__dirname, '../../../assets/cacert.pem')).toString();
    }
    return certificate;
}
/**
 * Make HTTP request to Gigya.
 */
exports.httpRequest = function (endpoint, host, requestParams) {
    return new Promise(function (resolve, reject) {
        var uri = "https://" + host + "/" + endpoint;
        request.post(uri, {
            method: 'post',
            form: requestParams,
            ca: getCertificate()
        }, function (error, response, body) {
            if (error) {
                reject(error);
            }
            try {
                resolve(JSON.parse(body));
            }
            catch (ex) {
                reject(ex);
            }
        });
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.httpRequest;
//# sourceMappingURL=default-http-request.js.map