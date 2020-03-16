"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var transform_1 = __importDefault(require("lodash/transform"));
var orderBy_1 = __importDefault(require("lodash/orderBy"));
/**
 * 格式化数据，使值满足antd的props-type
 * @param { Array<string | number> } rawArray: 原数据
 */
function formatTableValue(rawArray) {
    return transform_1.default(rawArray, function (result, item) {
        result.push({ value: item });
    }, []);
}
exports.formatTableValue = formatTableValue;
/**
 * 对数组内的index排序，从大到小
 */
function sortIndex(rawArray) {
    if (rawArray.length <= 1)
        return rawArray;
    return orderBy_1.default(rawArray, [], ['desc']);
}
exports.sortIndex = sortIndex;
