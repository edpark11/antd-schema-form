"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var antd_1 = require("antd");
var selectOptionsRender_1 = require("./selectOptionsRender");
var styleName_1 = require("../../utils/styleName");
var TableComponent_1 = require("../FormArray/TableComponent");
var OneOf_1 = require("../FormObject/OneOf");
/* string类型组件 */
// 默认组件
function defaultString(root, form, required) {
    var $readOnly = root.$readOnly, $placeholder = root.$placeholder, $disabled = root.$disabled;
    return React.createElement(antd_1.Input, { readOnly: $readOnly, placeholder: $placeholder, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined });
}
exports.defaultString = defaultString;
// 文本域
function textArea(root, form, required) {
    var $readOnly = root.$readOnly, $placeholder = root.$placeholder, $disabled = root.$disabled;
    return (React.createElement(antd_1.Input.TextArea, { rows: 6, readOnly: $readOnly, placeholder: $placeholder, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined }));
}
exports.textArea = textArea;
// select
function select(root, form, required) {
    var $required = root.$required, _a = root.$options, $options = _a === void 0 ? [] : _a, $placeholder = root.$placeholder, $disabled = root.$disabled;
    return (React.createElement(antd_1.Select, { className: styleName_1.default('string-select'), placeholder: $placeholder, allowClear: !($required || required), disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined }, selectOptionsRender_1.default($options)));
}
exports.select = select;
// radio（string类型和number类型都能用）
function radio(root, form, required) {
    var _a = root.$options, $options = _a === void 0 ? [] : _a, $disabled = root.$disabled;
    return React.createElement(antd_1.Radio.Group, { options: $options, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined });
}
exports.radio = radio;
// date
function date(root, form, required) {
    var id = root.id, $placeholder = root.$placeholder, $disabled = root.$disabled;
    return (React.createElement(antd_1.DatePicker, { format: "YYYY-MM-DD HH:mm:ss", showTime: true, placeholder: $placeholder, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined }));
}
exports.date = date;
// password
function password(root, form, required) {
    var $readOnly = root.$readOnly, $placeholder = root.$placeholder, $disabled = root.$disabled;
    return React.createElement(antd_1.Input.Password, { readOnly: $readOnly, placeholder: $placeholder, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined });
}
exports.password = password;
/* number类型组件 */
// 默认组件
function defaultNumber(root, form, required) {
    var $readOnly = root.$readOnly, $placeholder = root.$placeholder, $disabled = root.$disabled;
    return (React.createElement(antd_1.InputNumber, { className: styleName_1.default('number-input'), readOnly: $readOnly, placeholder: $placeholder, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined }));
}
exports.defaultNumber = defaultNumber;
/* boolean类型组件 */
// 默认组件
function defaultBoolean(root, form, required) {
    var $disabled = root.$disabled;
    return React.createElement(antd_1.Checkbox, { disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined });
}
exports.defaultBoolean = defaultBoolean;
// switch组件
function switchComponent(root, form, required) {
    var $disabled = root.$disabled;
    return React.createElement(antd_1.Switch, { disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined });
}
exports.switchComponent = switchComponent;
/* Array类型组件 */
// 默认组件
function defaultArray(root, form, required) {
    return React.createElement(TableComponent_1.default, { root: root });
}
exports.defaultArray = defaultArray;
// checkbox group
function checkboxGroup(root, form, required) {
    var _a = root.$options, $options = _a === void 0 ? [] : _a, $disabled = root.$disabled;
    return React.createElement(antd_1.Checkbox.Group, { options: $options, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined });
}
exports.checkboxGroup = checkboxGroup;
// multiple and tags
function multipleOrTags(root, form, required) {
    var _a = root.$options, $options = _a === void 0 ? [] : _a, $componentType = root.$componentType, $disabled = root.$disabled;
    var mode = ($componentType === 'multiple' || $componentType === 'tags')
        ? $componentType
        : undefined;
    return (React.createElement(antd_1.Select, { className: styleName_1.default('array-multiple'), mode: mode, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined }, selectOptionsRender_1.default($options)));
}
exports.multipleOrTags = multipleOrTags;
/* object类型组件 */
function defaultObject(root, form, element) {
    var title = root.title, id = root.id, description = root.description;
    // header
    var header = [
        React.createElement("b", { key: "title" }, title || id),
        React.createElement("span", { key: "description", className: styleName_1.default('object-description') }, description)
    ];
    return (React.createElement(antd_1.Collapse, { key: id, className: styleName_1.default('object-collapse'), defaultActiveKey: [id] },
        React.createElement(antd_1.Collapse.Panel, { key: id, header: header }, element)));
}
exports.defaultObject = defaultObject;
function defaultOneOf(root, form, element) {
    var id = root.id;
    return React.createElement(OneOf_1.default, { key: id, root: root, element: element });
}
exports.defaultOneOf = defaultOneOf;
