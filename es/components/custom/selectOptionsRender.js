"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var antd_1 = require("antd");
/* 渲染select的下拉框 */
function selectOptionsRender(options) {
    return options.map(function (item, index) {
        return React.createElement(antd_1.Select.Option, { key: "" + index, value: item.value }, item.label);
    });
}
exports.default = selectOptionsRender;
