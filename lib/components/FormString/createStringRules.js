"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isNil_1 = require("lodash/isNil");
var isNumber_1 = require("lodash/isNumber");
var isString_1 = require("lodash/isString");
var template_1 = require("../../utils/template");
function createStringRules(languagePack, root, required) {
    var $required = root.$required, $requiredMessage = root.$requiredMessage, pattern = root.pattern, $patternOption = root.$patternOption, $patternMessage = root.$patternMessage, minLength = root.minLength, maxLength = root.maxLength, $minLengthMessage = root.$minLengthMessage, $maxLengthMessage = root.$maxLengthMessage, $length = root.$length, $lengthMessage = root.$lengthMessage, $enumMessage = root.$enumMessage;
    var enums = root.enum;
    var rules = [];
    // 判断表单是否必填
    if ($required === true || required === true) {
        rules.push({
            required: true,
            message: $requiredMessage || languagePack.rules.required,
            whitespace: true
        });
    }
    // 枚举
    if (enums) {
        rules.push({
            type: 'enum',
            enum: enums,
            message: template_1.default($enumMessage || languagePack.rules.enum, {
                '0': "[" + enums.join(', ') + "]"
            })
        });
    }
    // 字段的最小长度
    if (!isNil_1.default(minLength) && isNumber_1.default(minLength)) {
        rules.push({
            min: minLength,
            message: template_1.default($minLengthMessage || languagePack.rules.string.min, {
                '0': minLength
            })
        });
    }
    // 字段的最大长度
    if (!isNil_1.default(maxLength)) {
        rules.push({
            max: maxLength,
            message: template_1.default($maxLengthMessage || languagePack.rules.string.max, {
                '0': maxLength
            })
        });
    }
    // 字段的长度
    if (!isNil_1.default($length) && isNumber_1.default($length)) {
        rules.push({
            len: $length,
            message: template_1.default($lengthMessage || languagePack.rules.string.length, {
                '0': $length
            })
        });
    }
    // 正则表达式
    if (pattern) {
        var reg = new RegExp(pattern, isString_1.default($patternOption) ? $patternOption : undefined);
        rules.push({
            pattern: reg,
            message: template_1.default($patternMessage || languagePack.rules.string.pattern, {
                '0': "/" + pattern + "/" + (isString_1.default($patternOption) ? $patternOption : '')
            })
        });
    }
    return rules;
}
exports.default = createStringRules;
