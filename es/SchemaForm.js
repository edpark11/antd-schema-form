var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import { useEffect, forwardRef, useImperativeHandle } from 'react';
import * as PropTypes from 'prop-types';
import isPlainObject from 'lodash/isPlainObject';
import { Form } from 'antd';
import AntdSchemaFormContext from './context';
import FormObject from './components/FormObject/FormObject';
import getObjectFromValue from './utils/getObjectFromValue';
import getObjectFromSchema from './utils/getObjectFromSchema';
import languagePack from './languagePack';
var SchemaForm = forwardRef(function (props, ref) {
    var form = Form.useForm()[0];
    var schemaFormValue = props.value, json = props.json, onOk = props.onOk, onCancel = props.onCancel, okText = props.okText, cancelText = props.cancelText, footer = props.footer, customComponent = props.customComponent, customTableRender = props.customTableRender, _a = props.formOptions, formOptions = _a === void 0 ? {} : _a;
    // 获取系统语言
    // eslint-disable-next-line @typescript-eslint/tslint/config
    var language = typeof window === 'object' // 服务器端渲染判断
        ? (window.navigator.language || window.navigator['userLanguage']).toLocaleLowerCase()
        : 'default';
    var customLangPack = props.languagePack; // 自定义语言包
    var langP = (typeof customLangPack === 'object' && isPlainObject(customLangPack))
        ? customLangPack
        : (language in languagePack ? languagePack[language] : languagePack['default']); // 语言包
    var contextValue = {
        form: form,
        customComponent: customComponent,
        customTableRender: customTableRender,
        language: language,
        languagePack: langP // 语言包
    };
    useImperativeHandle(ref, function () { return form; });
    useEffect(function () {
        var defaultValue = getObjectFromSchema(json);
        var obj = getObjectFromValue(schemaFormValue);
        form.resetFields();
        form.setFieldsValue(__assign(__assign({}, defaultValue), obj));
    }, [schemaFormValue]);
    return (React.createElement(AntdSchemaFormContext.Provider, { value: contextValue },
        React.createElement(Form, __assign({ layout: "vertical", form: form }, formOptions),
            React.createElement(FormObject, { root: json, onOk: onOk, onCancel: onCancel, okText: okText, cancelText: cancelText, footer: footer }))));
});
SchemaForm.propTypes = {
    json: PropTypes.object.isRequired,
    value: PropTypes.object,
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
    footer: PropTypes.func,
    customComponent: PropTypes.objectOf(PropTypes.func),
    customTableRender: PropTypes.objectOf(PropTypes.func),
    languagePack: PropTypes.object
};
SchemaForm.defaultProps = {
    customComponent: {},
    customTableRender: {}
};
export default SchemaForm;
