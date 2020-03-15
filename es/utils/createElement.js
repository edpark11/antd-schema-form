"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* 创建组件 */
function createElement(fn, args) {
    if (fn) {
        return fn.apply(void 0, args);
    }
    else {
        return null;
    }
}
exports.default = createElement;
