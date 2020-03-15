import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import template from '../../utils/template';
function createStringRules(languagePack, root, required) {
    var $required = root.$required, $requiredMessage = root.$requiredMessage, pattern = root.pattern, $patternOption = root.$patternOption, $patternMessage = root.$patternMessage, minLength = root.minLength, maxLength = root.maxLength, $minLengthMessage = root.$minLengthMessage, $maxLengthMessage = root.$maxLengthMessage, $length = root.$length, $lengthMessage = root.$lengthMessage, $enumMessage = root.$enumMessage;
    var enums = root["enum"];
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
            "enum": enums,
            message: template($enumMessage || languagePack.rules["enum"], {
                '0': "[" + enums.join(', ') + "]"
            })
        });
    }
    // 字段的最小长度
    if (!isNil(minLength) && isNumber(minLength)) {
        rules.push({
            min: minLength,
            message: template($minLengthMessage || languagePack.rules.string.min, {
                '0': minLength
            })
        });
    }
    // 字段的最大长度
    if (!isNil(maxLength)) {
        rules.push({
            max: maxLength,
            message: template($maxLengthMessage || languagePack.rules.string.max, {
                '0': maxLength
            })
        });
    }
    // 字段的长度
    if (!isNil($length) && isNumber($length)) {
        rules.push({
            len: $length,
            message: template($lengthMessage || languagePack.rules.string.length, {
                '0': $length
            })
        });
    }
    // 正则表达式
    if (pattern) {
        var reg = new RegExp(pattern, isString($patternOption) ? $patternOption : undefined);
        rules.push({
            pattern: reg,
            message: template($patternMessage || languagePack.rules.string.pattern, {
                '0': "/" + pattern + "/" + (isString($patternOption) ? $patternOption : '')
            })
        });
    }
    return rules;
}
export default createStringRules;
