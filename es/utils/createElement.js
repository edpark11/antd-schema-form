/* 创建组件 */
function createElement(fn, args) {
    if (fn) {
        return fn.apply(void 0, args);
    }
    else {
        return null;
    }
}
export default createElement;
