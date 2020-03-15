import { SchemaItem } from '../types';
/**
 * 获取schema.json下所有的key
 * @param { SchemaItem } item: 对象
 */
declare function getKeysFromObject(item: SchemaItem): Array<string>;
export default getKeysFromObject;
