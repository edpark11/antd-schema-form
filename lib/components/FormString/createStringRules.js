"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
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
    if (!lodash_1.isNil(minLength) && lodash_1.isNumber(minLength)) {
        rules.push({
            min: minLength,
            message: template_1.default($minLengthMessage || languagePack.rules.string.min, {
                '0': minLength
            })
        });
    }
    // 字段的最大长度
    if (!lodash_1.isNil(maxLength)) {
        rules.push({
            max: maxLength,
            message: template_1.default($maxLengthMessage || languagePack.rules.string.max, {
                '0': maxLength
            })
        });
    }
    // 字段的长度
    if (!lodash_1.isNil($length) && lodash_1.isNumber($length)) {
        rules.push({
            len: $length,
            message: template_1.default($lengthMessage || languagePack.rules.string.length, {
                '0': $length
            })
        });
    }
    // 正则表达式
    if (pattern) {
        var reg = new RegExp(pattern, lodash_1.isString($patternOption) ? $patternOption : undefined);
        rules.push({
            pattern: reg,
            message: template_1.default($patternMessage || languagePack.rules.string.pattern, {
                '0': "/" + pattern + "/" + (lodash_1.isString($patternOption) ? $patternOption : '')
            })
        });
    }
    return rules;
}
exports.default = createStringRules;
