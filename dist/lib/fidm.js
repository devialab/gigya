"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var fidm_oidc_1 = require("./fidm.oidc");
var fidm_saml_1 = require("./fidm.saml");
__export(require("./fidm.oidc"));
__export(require("./fidm.saml"));
var Fidm = (function () {
    function Fidm(gigya) {
        this.gigya = gigya;
        this.oidc = new fidm_oidc_1.default(gigya);
        this.saml = new fidm_saml_1.default(gigya);
    }
    return Fidm;
}());
exports.Fidm = Fidm;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Fidm;
//# sourceMappingURL=fidm.js.map