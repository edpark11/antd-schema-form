import * as React from 'react';
import { Input, Select, Radio, DatePicker, InputNumber, Checkbox, Switch, Collapse } from 'antd';
import selectOptionsRender from './selectOptionsRender';
import styleName from '../../utils/styleName';
import TableComponent from '../FormArray/TableComponent';
import OneOf from '../FormObject/OneOf';
/* string类型组件 */
// 默认组件
export function defaultString(root, form, required) {
    var $readOnly = root.$readOnly, $placeholder = root.$placeholder, $disabled = root.$disabled;
    return React.createElement(Input, { readOnly: $readOnly, placeholder: $placeholder, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined });
}
// 文本域
export function textArea(root, form, required) {
    var $readOnly = root.$readOnly, $placeholder = root.$placeholder, $disabled = root.$disabled;
    return (React.createElement(Input.TextArea, { rows: 6, readOnly: $readOnly, placeholder: $placeholder, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined }));
}
// select
export function select(root, form, required) {
    var $required = root.$required, _a = root.$options, $options = _a === void 0 ? [] : _a, $placeholder = root.$placeholder, $disabled = root.$disabled;
    return (React.createElement(Select, { className: styleName('string-select'), placeholder: $placeholder, allowClear: !($required || required), disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined }, selectOptionsRender($options)));
}
// radio（string类型和number类型都能用）
export function radio(root, form, required) {
    var _a = root.$options, $options = _a === void 0 ? [] : _a, $disabled = root.$disabled;
    return React.createElement(Radio.Group, { options: $options, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined });
}
// date
export function date(root, form, required) {
    var id = root.id, $placeholder = root.$placeholder, $disabled = root.$disabled;
    return (React.createElement(DatePicker, { format: "YYYY-MM-DD HH:mm:ss", showTime: true, placeholder: $placeholder, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined }));
}
// password
export function password(root, form, required) {
    var $readOnly = root.$readOnly, $placeholder = root.$placeholder, $disabled = root.$disabled;
    return React.createElement(Input.Password, { readOnly: $readOnly, placeholder: $placeholder, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined });
}
/* number类型组件 */
// 默认组件
export function defaultNumber(root, form, required) {
    var $readOnly = root.$readOnly, $placeholder = root.$placeholder, $disabled = root.$disabled;
    return (React.createElement(InputNumber, { className: styleName('number-input'), readOnly: $readOnly, placeholder: $placeholder, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined }));
}
/* boolean类型组件 */
// 默认组件
export function defaultBoolean(root, form, required) {
    var $disabled = root.$disabled;
    return React.createElement(Checkbox, { disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined });
}
// switch组件
export function switchComponent(root, form, required) {
    var $disabled = root.$disabled;
    return React.createElement(Switch, { disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined });
}
/* Array类型组件 */
// 默认组件
export function defaultArray(root, form, required) {
    return React.createElement(TableComponent, { root: root });
}
// checkbox group
export function checkboxGroup(root, form, required) {
    var _a = root.$options, $options = _a === void 0 ? [] : _a, $disabled = root.$disabled;
    return React.createElement(Checkbox.Group, { options: $options, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined });
}
// multiple and tags
export function multipleOrTags(root, form, required) {
    var _a = root.$options, $options = _a === void 0 ? [] : _a, $componentType = root.$componentType, $disabled = root.$disabled;
    var mode = ($componentType === 'multiple' || $componentType === 'tags')
        ? $componentType
        : undefined;
    return (React.createElement(Select, { className: styleName('array-multiple'), mode: mode, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined }, selectOptionsRender($options)));
}
/* object类型组件 */
export function defaultObject(root, form, element) {
    var title = root.title, id = root.id, description = root.description;
    // header
    var header = [
        React.createElement("b", { key: "title" }, title || id),
        React.createElement("span", { key: "description", className: styleName('object-description') }, description)
    ];
    return (React.createElement(Collapse, { key: id, className: styleName('object-collapse'), defaultActiveKey: [id] },
        React.createElement(Collapse.Panel, { key: id, header: header }, element)));
}
export function defaultOneOf(root, form, element) {
    var id = root.id;
    return React.createElement(OneOf, { key: id, root: root, element: element });
}
