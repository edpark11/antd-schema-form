"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sortBy_1 = require("lodash/sortBy");
var toPairs_1 = require("lodash/toPairs");
var fromPairs_1 = require("lodash/fromPairs");
/* 对root.properties进行排序 */
function sortProperties(properties) {
    var propertiesArr = (Object.entries || toPairs_1.default)(properties);
    var sortPropertiesArr = sortBy_1.default(propertiesArr, function (o) {
        var _a;
        return (_a = o[1].$order) !== null && _a !== void 0 ? _a : 0;
    });
    // @ts-ignore
    return (Object.fromEntries || fromPairs_1.default)(sortPropertiesArr);
}
exports.default = sortProperties;
