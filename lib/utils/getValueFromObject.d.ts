import { Store } from 'rc-field-form/es/interface';
/**
 * 格式化数据
 * @param { Store } formValue: 表单值
 * @param { string } basicId: 格式化数据的id
 */
export declare function formatValueBeforeGetValue(formValue: Store, basicId: string): Store;
/**
 * 从form获取到的表单的值，格式化成object对象
 * @param { object } value: 表单值
 */
declare function getValueFromObject(value: Store): object;
export default getValueFromObject;
