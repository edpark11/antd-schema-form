import transform from 'lodash/transform';
import isPlainObject from 'lodash/isPlainObject';
/**
 * 格式化数据
 * @param { Store } formValue: 表单值
 * @param { string } basicId: 格式化数据的id
 */
export function formatValueBeforeGetValue(formValue, basicId) {
    const reg = new RegExp(`^${basicId.replace(/\$/g, '\\$')}/`);
    return transform(formValue, function (result, value, key) {
        const formatKey = key.replace(reg, '');
        result[formatKey] = value;
    }, {});
}
/**
 * 从form获取到的表单的值，格式化成object对象
 * @param { object } value: 表单值
 */
function getValueFromObject(value) {
    const obj = {};
    for (const key in value) {
        const keyArr = key.split('/');
        const len = keyArr.length;
        let index = 0;
        let point = obj;
        while (index < len) {
            // 判断是否为对象
            const nowKey = keyArr[index];
            const nextKey = keyArr[index + 1];
            if (nextKey && nextKey === 'properties') {
                if (!isPlainObject(point[nowKey]))
                    point[nowKey] = {};
                point = point[nowKey];
                index += 2;
            }
            else if (!nextKey) {
                point[nowKey] = value[key];
                break;
            }
            else if (nextKey && nextKey === 'items') {
                break;
            }
            else {
                index += 1;
            }
        }
    }
    return obj;
}
export default getValueFromObject;
