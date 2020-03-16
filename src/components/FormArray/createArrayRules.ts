import { isNil, isNumber } from 'lodash';
import { Rule, RuleObject } from 'rc-field-form/es/interface';
import template from '../../utils/template';
import { ArrayItem } from '../../types';

function createArrayRules(
  languagePack: any,
  root: ArrayItem,
  required: boolean
): Array<Rule> {
  const {
    minItems,
    maxItems,
    $minItemsMessage,
    $maxItemsMessage
  }: ArrayItem = root;
  const rules: Rule[] = [];

  // 数组内元素的数量最少值
  if (!isNil(minItems) && isNumber(minItems)) {
    rules.push({
      validator: async (rule: RuleObject, value: Array<any>): Promise<void> => {
        if (minItems !== undefined && value && value.length < minItems) {
          throw new Error(
            typeof rule.message === 'string' ? rule.message : undefined
          );
        } else {
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
      validator: async (
        rule: RuleObject,
        value: Array<any>,
        callback: Function
      ): Promise<void> => {
        if (maxItems !== undefined && value && value.length > maxItems) {
          throw new Error(
            typeof rule.message === 'string' ? rule.message : undefined
          );
        } else {
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
