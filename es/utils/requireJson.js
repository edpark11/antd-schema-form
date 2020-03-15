"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function isModule(value) {
    return lodash_1.isObject(value) && Object.prototype.toString.call(value) === '[object Module]';
}
/**
 * 加载json文件
 *
 * typescript下，json包含default
 * babel下，json不包含default
 */
function requireJson(modules) {
    if (isModule(modules) && 'default' in modules) {
        return modules.default;
    }
    else {
        return modules;
    }
}
exports.default = requireJson;
