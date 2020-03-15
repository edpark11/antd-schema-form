import * as React from 'react';
import { Fragment, useContext } from 'react';
import * as PropTypes from 'prop-types';
import isArray from 'lodash/isArray';
import { Button } from 'antd';
import AntdSchemaFormContext from '../../context';
import styleName from '../../utils/styleName';
import FormString from '../FormString/FormString';
import FormNumber from '../FormNumber/FormNumber';
import FormBoolean from '../FormBoolean/FormBoolean';
import FormArray from '../FormArray/FormArray';
import getValueFromObject from '../../utils/getValueFromObject';
import getKeysFromObject from '../../utils/getKeysFromObject';
import createElement from '../../utils/createElement';
import sortProperties from '../../utils/sortProperties';
function FormObject(props) {
    const context = useContext(AntdSchemaFormContext);
    if (!('form' in context))
        return null; // 类型判断
    const { form, customComponent, languagePack } = context;
    const { root: formObjectRoot, onOk, onCancel, okText = languagePack.formObject.okText, cancelText = languagePack.formObject.cancelText, footer } = props;
    // 根据type渲染不同的组件
    function renderComponentByTypeView(root, required) {
        const { id, type } = root;
        const _required = !!required;
        const props = { key: id, root, required: _required };
        // 渲染oneOf
        if ('oneOf' in root && root.oneOf && isArray(root.oneOf) && root.oneOf.length > 0) {
            // eslint-disable-next-line no-use-before-define
            return renderOneOfComponentView(root, _required);
        }
        switch (type) {
            case 'string':
                return React.createElement(FormString, Object.assign({}, props));
            case 'integer':
            case 'number':
                return React.createElement(FormNumber, Object.assign({}, props));
            case 'boolean':
                return React.createElement(FormBoolean, Object.assign({}, props));
            case 'array':
                return React.createElement(FormArray, Object.assign({}, props));
            case 'object':
                // eslint-disable-next-line no-use-before-define
                return renderObjectComponentView(root);
            default:
                return null;
        }
    }
    // oneOf组件
    function renderOneOfComponentView(root, required) {
        const { oneOf, $oneOfComponentType } = root;
        const element = [];
        (oneOf || []).forEach((value, index, array) => {
            const childrenRoot = { ...value };
            for (const key in root) {
                // children不继承oneOf相关的属性
                if (!(key in childrenRoot) && !['oneOf', '$oneOfDisabled', '$oneOfIndex', '$oneOfComponentType'].includes(key)) {
                    childrenRoot[key] = root[key];
                }
            }
            element.push(renderComponentByTypeView(childrenRoot, required));
        });
        let oneOfElement = null;
        if (customComponent) {
            oneOfElement = $oneOfComponentType && $oneOfComponentType in customComponent
                ? customComponent[$oneOfComponentType](root, form, element)
                : createElement(customComponent.defaultOneOf, [root, form, element]);
        }
        return oneOfElement;
    }
    // 渲染一个object组件
    function renderObjectComponentView(root) {
        const { $componentType } = root;
        const required = root.required || [];
        const properties = sortProperties(root.properties || {});
        const element = [];
        // 判断object下组件的类型并渲染，只要有一个有值就要显示
        for (const key in properties) {
            element.push(renderComponentByTypeView(properties[key], required.includes(key)));
        }
        let objectElement = null;
        if (customComponent) {
            objectElement = ($componentType && $componentType in customComponent)
                ? customComponent[$componentType](root, form, element)
                : createElement(customComponent.defaultObject, [root, form, element]);
        }
        return objectElement;
    }
    // ok事件
    async function handleOkClick(event) {
        var _a, _b;
        try {
            const keys = getKeysFromObject(formObjectRoot);
            const formValue = await form.validateFields(keys);
            const value = getValueFromObject(formValue);
            onOk && onOk(form, value, keys);
        }
        catch (err) {
            console.error(err);
            form.scrollToField((_b = (_a = err === null || err === void 0 ? void 0 : err.errorFields) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.name);
        }
    }
    // cancel事件
    function handleCancelClick(event) {
        onCancel && onCancel(form);
    }
    // 确认和取消按钮
    function footerView() {
        if (onOk || onCancel) {
            return (React.createElement("div", { className: styleName('object-click-button-box') },
                onOk
                    ? React.createElement(Button, { type: "primary", onClick: handleOkClick }, okText)
                    : null,
                onCancel ? (React.createElement(Button, { className: onOk ? styleName('object-cancel') : undefined, onClick: handleCancelClick }, cancelText)) : null));
        }
        else {
            return null;
        }
    }
    return (React.createElement(Fragment, null,
        renderComponentByTypeView(formObjectRoot),
        footer ? footer(form) : footerView()));
}
FormObject.propTypes = {
    root: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    okText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    cancelText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    footer: PropTypes.func
};
export default FormObject;
