import { Store } from 'rc-field-form/es/interface';
import { SchemaItem, StringItem, NumberItem, BooleanItem, ArrayItem } from '../types';
declare type SchemaJson = SchemaItem | StringItem | NumberItem | BooleanItem | ArrayItem;
/**
 * 从schema里面提取出$defaultValue
 * @param { SchemaJson } schemaJsonItem: 对象
 * @param { string } id: 可能不存在id，使用上一个对象的id
 */
declare function getObjectFromSchema(schemaJsonItem: SchemaJson, id?: string): Store;
export default getObjectFromSchema;
