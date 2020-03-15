import transform from 'lodash/transform';
import orderBy from 'lodash/orderBy';
/**
 * 格式化数据，使值满足antd的props-type
 * @param { Array<string | number> } rawArray: 原数据
 */
export function formatTableValue(rawArray) {
    return transform(rawArray, function (result, item) {
        result.push({ value: item });
    }, []);
}
/**
 * 对数组内的index排序，从大到小
 */
export function sortIndex(rawArray) {
    if (rawArray.length <= 1)
        return rawArray;
    return orderBy(rawArray, [], ['desc']);
}
