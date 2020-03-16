"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var antd_1 = require("antd");
/* 渲染select的下拉框 */
function selectOptionsRender(options) {
    return options.map(function (item, index) {
        return React.createElement(antd_1.Select.Option, { key: "" + index, value: item.value }, item.label);
    });
}
exports.default = selectOptionsRender;
