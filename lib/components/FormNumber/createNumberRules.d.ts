import { Rule } from 'rc-field-form/es/interface';
import { NumberItem } from '../../types';
declare function createNumberRules(languagePack: any, root: NumberItem, required: boolean, isInteger: boolean): Array<Rule>;
export default createNumberRules;
