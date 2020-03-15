/**
 * 格式化数据，使值满足antd的props-type
 * @param { Array<string | number> } rawArray: 原数据
 */
export declare function formatTableValue(rawArray: Array<string | number>): Array<{
    value: string | number;
}>;
/**
 * 对数组内的index排序，从大到小
 */
export declare function sortIndex(rawArray: Array<number>): Array<number>;
