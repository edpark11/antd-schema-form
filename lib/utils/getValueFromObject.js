"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
/**
 * 格式化数据
 * @param { Store } formValue: 表单值
 * @param { string } basicId: 格式化数据的id
 */
function formatValueBeforeGetValue(formValue, basicId) {
    var reg = new RegExp("^" + basicId.replace(/\$/g, "\\$") + "/");
    return lodash_1.transform(formValue, function (result, value, key) {
        var formatKey = key.replace(reg, "");
        result[formatKey] = value;
    }, {});
}
exports.formatValueBeforeGetValue = formatValueBeforeGetValue;
/**
 * 从form获取到的表单的值，格式化成object对象
 * @param { object } value: 表单值
 */
function getValueFromObject(value) {
    var obj = {};
    for (var key in value) {
        var keyArr = key.split("/");
        var len = keyArr.length;
        var index = 0;
        var point = obj;
        while (index < len) {
            // 判断是否为对象
            var nowKey = keyArr[index];
            var nextKey = keyArr[index + 1];
            if (nextKey && nextKey === "properties") {
                if (!lodash_1.isPlainObject(point[nowKey]))
                    point[nowKey] = {};
                point = point[nowKey];
                index += 2;
            }
            else if (!nextKey) {
                point[nowKey] = value[key];
                break;
            }
            else if (nextKey && nextKey === "items") {
                break;
            }
            else {
                index += 1;
            }
        }
    }
    return obj;
}
exports.default = getValueFromObject;
