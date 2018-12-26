"use strict";
/**
 * Resolve promise after sleeping for X ms.
 */
function sleep(ms) {
    return new Promise(function (resolve, reject) {
        if (ms === 0) {
            setImmediate(resolve);
        }
        else {
            setTimeout(function () { return resolve(); }, ms);
        }
    });
}
exports.sleep = sleep;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sleep;
//# sourceMappingURL=sleep.js.map