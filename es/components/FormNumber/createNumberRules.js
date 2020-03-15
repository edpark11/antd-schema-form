import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';
import template from '../../utils/template';
function createNumberRules(languagePack, root, required, isInteger) {
    const { $required, $requiredMessage, minimum, maximum, $minimumMessage, $maximumMessage, $integer, $integerMessage, $enumMessage } = root;
    const enums = root.enum;
    const rules = [];
    // 判断表单是否必填
    if ($required || required) {
        rules.push({
            required: true,
            message: $requiredMessage || languagePack.rules.required
        });
    }
    // 枚举
    if (enums) {
        rules.push({
            type: 'enum',
            enum: enums,
            message: template($enumMessage || languagePack.rules.enum, {
                '0': `[${enums.join(', ')}]`
            })
        });
    }
    // 整数
    if (isInteger || $integer) {
        rules.push({
            type: 'integer',
            message: $integerMessage || languagePack.rules.number.integer
        });
    }
    // 最小值
    if (!isNil(minimum) && isNumber(minimum)) {
        rules.push({
            validator: async (rule, value) => {
                if (minimum !== undefined) {
                    // 当表单没有值时，value的type为string
                    if (typeof value === 'number' && value < minimum) {
                        throw new Error(typeof rule.message === 'string' ? rule.message : undefined);
                    }
                    else {
                        return await Promise.resolve();
                    }
                }
                else {
                    return await Promise.resolve();
                }
            },
            message: template($minimumMessage || languagePack.rules.number.minimum, {
                '0': minimum
            })
        });
    }
    // 最大值
    if (!isNil(maximum) && isNumber(maximum)) {
        rules.push({
            validator: async (rule, value) => {
                if (maximum !== undefined) {
                    // 当表单没有值时，value的type为string
                    if (typeof value === 'number' && value > maximum) {
                        throw new Error(typeof rule.message === 'string' ? rule.message : undefined);
                    }
                    else {
                        return await Promise.resolve();
                    }
                }
                else {
                    return await Promise.resolve();
                }
            },
            message: template($maximumMessage || languagePack.rules.number.maximum, {
                maximum
            })
        });
    }
    return rules;
}
export default createNumberRules;
