/* 创建组件 */
function createElement(fn, args) {
    if (fn) {
        return fn(...args);
    }
    else {
        return null;
    }
}
export default createElement;
