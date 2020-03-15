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
const SchemaForm = forwardRef(function (props, ref) {
    const [form] = Form.useForm();
    const { value: schemaFormValue, json, onOk, onCancel, okText, cancelText, footer, customComponent, customTableRender, formOptions = {} } = props;
    // 获取系统语言
    // eslint-disable-next-line @typescript-eslint/tslint/config
    const language = typeof window === 'object' // 服务器端渲染判断
        ? (window.navigator.language || window.navigator['userLanguage']).toLocaleLowerCase()
        : 'default';
    const customLangPack = props.languagePack; // 自定义语言包
    const langP = (typeof customLangPack === 'object' && isPlainObject(customLangPack))
        ? customLangPack
        : (language in languagePack ? languagePack[language] : languagePack['default']); // 语言包
    const contextValue = {
        form,
        customComponent,
        customTableRender,
        language,
        languagePack: langP // 语言包
    };
    useImperativeHandle(ref, () => form);
    useEffect(function () {
        const defaultValue = getObjectFromSchema(json);
        const obj = getObjectFromValue(schemaFormValue);
        form.resetFields();
        form.setFieldsValue({ ...defaultValue, ...obj });
    }, [schemaFormValue]);
    return (React.createElement(AntdSchemaFormContext.Provider, { value: contextValue },
        React.createElement(Form, Object.assign({ layout: "vertical", form: form }, formOptions),
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
