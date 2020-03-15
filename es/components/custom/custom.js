import * as React from 'react';
import { Input, Select, Radio, DatePicker, InputNumber, Checkbox, Switch, Collapse } from 'antd';
import selectOptionsRender from './selectOptionsRender';
import styleName from '../../utils/styleName';
import TableComponent from '../FormArray/TableComponent';
import OneOf from '../FormObject/OneOf';
/* string类型组件 */
// 默认组件
export function defaultString(root, form, required) {
    const { $readOnly, $placeholder, $disabled } = root;
    return React.createElement(Input, { readOnly: $readOnly, placeholder: $placeholder, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined });
}
// 文本域
export function textArea(root, form, required) {
    const { $readOnly, $placeholder, $disabled } = root;
    return (React.createElement(Input.TextArea, { rows: 6, readOnly: $readOnly, placeholder: $placeholder, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined }));
}
// select
export function select(root, form, required) {
    const { $required, $options = [], $placeholder, $disabled } = root;
    return (React.createElement(Select, { className: styleName('string-select'), placeholder: $placeholder, allowClear: !($required || required), disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined }, selectOptionsRender($options)));
}
// radio（string类型和number类型都能用）
export function radio(root, form, required) {
    const { $options = [], $disabled } = root;
    return React.createElement(Radio.Group, { options: $options, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined });
}
// date
export function date(root, form, required) {
    const { id, $placeholder, $disabled } = root;
    return (React.createElement(DatePicker, { format: "YYYY-MM-DD HH:mm:ss", showTime: true, placeholder: $placeholder, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined }));
}
// password
export function password(root, form, required) {
    const { $readOnly, $placeholder, $disabled } = root;
    return React.createElement(Input.Password, { readOnly: $readOnly, placeholder: $placeholder, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined });
}
/* number类型组件 */
// 默认组件
export function defaultNumber(root, form, required) {
    const { $readOnly, $placeholder, $disabled } = root;
    return (React.createElement(InputNumber, { className: styleName('number-input'), readOnly: $readOnly, placeholder: $placeholder, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined }));
}
/* boolean类型组件 */
// 默认组件
export function defaultBoolean(root, form, required) {
    const { $disabled } = root;
    return React.createElement(Checkbox, { disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined });
}
// switch组件
export function switchComponent(root, form, required) {
    const { $disabled } = root;
    return React.createElement(Switch, { disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined });
}
/* Array类型组件 */
// 默认组件
export function defaultArray(root, form, required) {
    return React.createElement(TableComponent, { root: root });
}
// checkbox group
export function checkboxGroup(root, form, required) {
    const { $options = [], $disabled } = root;
    return React.createElement(Checkbox.Group, { options: $options, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined });
}
// multiple and tags
export function multipleOrTags(root, form, required) {
    const { $options = [], $componentType, $disabled } = root;
    const mode = ($componentType === 'multiple' || $componentType === 'tags')
        ? $componentType
        : undefined;
    return (React.createElement(Select, { className: styleName('array-multiple'), mode: mode, disabled: $disabled !== null && $disabled !== void 0 ? $disabled : undefined }, selectOptionsRender($options)));
}
/* object类型组件 */
export function defaultObject(root, form, element) {
    const { title, id, description } = root;
    // header
    const header = [
        React.createElement("b", { key: "title" }, title || id),
        React.createElement("span", { key: "description", className: styleName('object-description') }, description)
    ];
    return (React.createElement(Collapse, { key: id, className: styleName('object-collapse'), defaultActiveKey: [id] },
        React.createElement(Collapse.Panel, { key: id, header: header }, element)));
}
export function defaultOneOf(root, form, element) {
    const { id } = root;
    return React.createElement(OneOf, { key: id, root: root, element: element });
}
