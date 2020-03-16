import { Store } from "rc-field-form/es/interface";
/**
 * object对象，格式化成表单需要的值
 * @param { object } obj: 对象
 * @param { string } basicId: 前置id
 */
declare function getObjectFromValue(obj: object, basicId?: string): Store;
export default getObjectFromValue;
