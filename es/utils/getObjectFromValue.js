"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
/**
 * object对象，格式化成表单需要的值
 * @param { object } obj: 对象
 * @param { string } basicId: 前置id
 */
function getObjectFromValue(obj, basicId) {
    var value = {};
    for (var key in obj) {
        var item = obj[key];
        if (lodash_1.isPlainObject(item) && !item._isAMomentObject) {
            var bid = basicId
                ? basicId + "/" + key + "/properties"
                : key + "/properties";
            var result = getObjectFromValue(item, bid);
            value = __assign(__assign({}, value), result);
        }
        else {
            value[basicId ? basicId + "/" + key : key] = item;
        }
    }
    return value;
}
exports.default = getObjectFromValue;
