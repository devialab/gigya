"use strict";
var Audit = (function () {
    function Audit(gigya) {
        this.gigya = gigya;
    }
    /**
     * The method enables you to search your site's audit log using an SQL-like query.
     *
     * @see http://developers.gigya.com/display/GD/audit.search
     */
    Audit.prototype.search = function (params) {
        return this.gigya.request('audit.search', params);
    };
    return Audit;
}());
exports.Audit = Audit;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Audit;
//# sourceMappingURL=audit.js.map