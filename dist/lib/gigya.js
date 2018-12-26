"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var _ = require("lodash");
var sleep_1 = require("./helpers/sleep");
var sig_utils_1 = require("./sig-utils");
var admin_1 = require("./admin");
var socialize_1 = require("./socialize");
var accounts_1 = require("./accounts");
var ds_1 = require("./ds");
var gm_1 = require("./gm");
var fidm_1 = require("./fidm");
var reports_1 = require("./reports");
var idx_1 = require("./idx");
var gigya_error_1 = require("./gigya-error");
var error_code_1 = require("./interfaces/error-code");
__export(require("./sig-utils"));
__export(require("./admin"));
__export(require("./socialize"));
__export(require("./accounts"));
__export(require("./ds"));
__export(require("./gm"));
__export(require("./fidm"));
__export(require("./reports"));
__export(require("./idx"));
__export(require("./gigya-error"));
__export(require("./interfaces/error-code"));
var Gigya = (function () {
    function Gigya(apiKeyOrProxy, dataCenter, userKeyOrSecretOrProxy, secret) {
        // Work with overload signature.
        if (typeof apiKeyOrProxy === 'function') {
            this.httpRequest = apiKeyOrProxy;
        }
        else if (apiKeyOrProxy) {
            this.apiKey = apiKeyOrProxy;
            this.dataCenter = dataCenter;
            if (typeof userKeyOrSecretOrProxy === 'function') {
                this.httpRequest = userKeyOrSecretOrProxy;
            }
            else if (!secret) {
                this.secret = userKeyOrSecretOrProxy;
            }
            else {
                this.userKey = userKeyOrSecretOrProxy;
                this.secret = secret;
            }
        }
        // Late-initialize default proxy to support browser-based environments.
        // Should not typically be used instead of Gigya JS SDK for public-facing sites.
        // Designed for environments where access is given directly to API in browser but request is proxied through server for credentials.
        if (!this.httpRequest) {
            this.httpRequest = require('./helpers/default-http-request').httpRequest;
        }
        // Initialize sub-classes.
        this.sigUtils = new sig_utils_1.default(this.secret);
        this.admin = new admin_1.default(this);
        this.socialize = new socialize_1.default(this);
        this.accounts = new accounts_1.default(this);
        this.ds = new ds_1.default(this);
        this.gm = new gm_1.default(this);
        this.fidm = new fidm_1.default(this);
        this.reports = new reports_1.default(this);
        this.idx = new idx_1.default(this);
    }
    /**
     * Make request to Gigya. Typically, you'll want to use the defined interface (for example gigya.accounts.getAccountInfo) instead of calling request directly.
     *
     * If a method is not available, create an issue or pull request at: https://github.com/scotthovestadt/gigya
     */
    Gigya.prototype.request = function (endpoint, userParams) {
        if (userParams === void 0) { userParams = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._request(endpoint, userParams)];
            });
        });
    };
    /**
     * Internal handler for requests.
     */
    Gigya.prototype._request = function (endpoint, userParams, retries) {
        if (retries === void 0) { retries = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var isAdminEndpoint, dataCenter, requestParams, response, namespace, host, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isAdminEndpoint = endpoint.startsWith('admin.');
                        dataCenter = this.dataCenter || 'us1';
                        if (!isAdminEndpoint) {
                            dataCenter = userParams.dataCenter || dataCenter;
                            delete userParams.dataCenter;
                        }
                        requestParams = _.assignIn(_.mapValues(userParams, function (value) {
                            if (value && (_.isObject(value) || _.isArray(value))) {
                                // Gigya wants arrays and objects stringified into JSON, eg Account profile and data objects.
                                return JSON.stringify(value);
                            }
                            else if (value === null) {
                                // Null is meaningful in some contexts. Ensure it is passed.
                                return 'null';
                            }
                            else {
                                return value;
                            }
                        }), {
                            format: 'json'
                        });
                        // Don't add credentials or API Key to request if oauth_token provided.
                        if (!userParams.oauth_token) {
                            // Add credentials to request if no credentials provided.
                            if (!userParams.secret && !userParams.userKey) {
                                if (this.secret) {
                                    requestParams['secret'] = this.secret;
                                }
                                if (this.userKey) {
                                    requestParams['userKey'] = this.userKey;
                                }
                            }
                            // Add API key to request if not provided.
                            if (!isAdminEndpoint && !userParams.apiKey && this.apiKey) {
                                requestParams['apiKey'] = this.apiKey;
                            }
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 7]);
                        namespace = endpoint.substring(0, endpoint.indexOf('.'));
                        host = namespace + "." + dataCenter + ".gigya.com";
                        return [4 /*yield*/, this.httpRequest(endpoint, host, requestParams)];
                    case 2:
                        response = _a.sent();
                        // Non-zero error code means failure.
                        if (response.errorCode !== 0) {
                            throw this.createErrorFromResponse(response, endpoint, userParams);
                        }
                        return [3 /*break*/, 7];
                    case 3:
                        e_1 = _a.sent();
                        if (!(e_1.errorCode === error_code_1.default.GENERAL_SERVER_ERROR
                            || e_1.errorCode === error_code_1.default.SEARCH_TIMED_OUT
                            || e_1.errorCode === error_code_1.default.CONCURRENT_UPDATES_NOT_ALLOWED)) return [3 /*break*/, 6];
                        retries++;
                        if (!(retries < Gigya.RETRY_LIMIT)) return [3 /*break*/, 6];
                        if (!Gigya.RETRY_DELAY) return [3 /*break*/, 5];
                        return [4 /*yield*/, sleep_1.default(Gigya.RETRY_DELAY)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, this._request(endpoint, userParams, retries)];
                    case 6: throw e_1;
                    case 7:
                        if (!(response.errorCode === error_code_1.default.RATE_LIMIT_HIT)) return [3 /*break*/, 9];
                        // Try again after waiting.
                        return [4 /*yield*/, sleep_1.default(Gigya.RATE_LIMIT_SLEEP)];
                    case 8:
                        // Try again after waiting.
                        _a.sent();
                        return [2 /*return*/, this._request(endpoint, userParams, retries)];
                    case 9:
                        // Ensure Gigya returned successful response. If not, throw error with details.
                        if ((response.errorCode !== error_code_1.default.SUCCESS
                            && response.errorCode !== undefined // exportUsers doesn't return an error code
                            && response.errorCode !== error_code_1.default.PENDING_REGISTRATION
                            && response.errorCode !== error_code_1.default.PENDING_VERIFICATION)) {
                            throw this.createErrorFromResponse(response, endpoint, userParams);
                        }
                        // Return Gigya's successful response.
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * Create GigyaError from response.
     */
    Gigya.prototype.createErrorFromResponse = function (response, endpoint, params) {
        // Create meaningful error message.
        var errorMessage = "Gigya API " + endpoint + " failed with error code " + response.errorCode;
        var errorDetails = response.errorDetails ? response.errorDetails : response.errorMessage;
        if (errorDetails) {
            errorMessage += " and message " + errorDetails;
        }
        if (response.validationErrors) {
            errorMessage += ':';
            for (var _i = 0, _a = response.validationErrors; _i < _a.length; _i++) {
                var validationError = _a[_i];
                errorMessage += " " + validationError.fieldName + ": " + validationError.message;
            }
        }
        var error = new gigya_error_1.default(errorMessage);
        error.gigyaResponse = response;
        error.errorCode = response.errorCode;
        error.params = params;
        return error;
    };
    return Gigya;
}());
Gigya.RATE_LIMIT_SLEEP = 2000;
Gigya.RETRY_LIMIT = 5;
Gigya.RETRY_DELAY = 5000;
exports.Gigya = Gigya;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Gigya;
//# sourceMappingURL=gigya.js.map