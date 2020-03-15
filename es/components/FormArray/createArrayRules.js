import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';
import template from '../../utils/template';
function createArrayRules(languagePack, root, required) {
    const { minItems, maxItems, $minItemsMessage, $maxItemsMessage } = root;
    const rules = [];
    // 数组内元素的数量最少值
    if (!isNil(minItems) && isNumber(minItems)) {
        rules.push({
            validator: async (rule, value) => {
                if (minItems !== undefined && value && value.length < minItems) {
                    throw new Error(typeof rule.message === 'string' ? rule.message : undefined);
                }
                else {
                    return await Promise.resolve();
                }
            },
            message: template($minItemsMessage || languagePack.rules.array.minItems, {
                '0': minItems
            })
        });
    }
    // 数组内元素的数量最大值
    if (!isNil(maxItems) && isNumber(maxItems)) {
        rules.push({
            validator: async (rule, value, callback) => {
                if (maxItems !== undefined && value && value.length > maxItems) {
                    throw new Error(typeof rule.message === 'string' ? rule.message : undefined);
                }
                else {
                    return await Promise.resolve();
                }
            },
            message: template($maxItemsMessage || languagePack.rules.array.maxItems, {
                '0': maxItems
            })
        });
    }
    return rules;
}
export default createArrayRules;
