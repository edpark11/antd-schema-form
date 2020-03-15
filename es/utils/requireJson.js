import { isObject } from 'lodash';
function isModule(value) {
    return isObject(value) && Object.prototype.toString.call(value) === '[object Module]';
}
/**
 * 加载json文件
 *
 * typescript下，json包含default
 * babel下，json不包含default
 */
function requireJson(modules) {
    if (isModule(modules) && 'default' in modules) {
        return modules.default;
    }
    else {
        return modules;
    }
}
export default requireJson;
