"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
/* 对root.properties进行排序 */
function sortProperties(properties) {
    var propertiesArr = (Object.entries || lodash_1.toPairs)(properties);
    var sortPropertiesArr = lodash_1.sortBy(propertiesArr, function (o) {
        var _a;
        return (_a = o[1].$order) !== null && _a !== void 0 ? _a : 0;
    });
    // @ts-ignore
    return (Object.fromEntries || lodash_1.fromPairs)(sortPropertiesArr);
}
exports.default = sortProperties;
