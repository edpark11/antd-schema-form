"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var PropTypes = require("prop-types");
var lodash_1 = require("lodash");
var antd_1 = require("antd");
var context_1 = require("./context");
var FormObject_1 = require("./components/FormObject/FormObject");
var getObjectFromValue_1 = require("./utils/getObjectFromValue");
var getObjectFromSchema_1 = require("./utils/getObjectFromSchema");
var languagePack_1 = require("./languagePack");
var SchemaForm = react_1.forwardRef(function (props, ref) {
    var form = antd_1.Form.useForm()[0];
    var schemaFormValue = props.value, json = props.json, onOk = props.onOk, onCancel = props.onCancel, okText = props.okText, cancelText = props.cancelText, footer = props.footer, customComponent = props.customComponent, customTableRender = props.customTableRender, _a = props.formOptions, formOptions = _a === void 0 ? {} : _a;
    // 获取系统语言
    // eslint-disable-next-line @typescript-eslint/tslint/config
    var language = typeof window === "object" // 服务器端渲染判断
        ? (window.navigator.language || window.navigator["userLanguage"]).toLocaleLowerCase()
        : "default";
    var customLangPack = props.languagePack; // 自定义语言包
    var langP = typeof customLangPack === "object" && lodash_1.isPlainObject(customLangPack)
        ? customLangPack
        : language in languagePack_1.default
            ? languagePack_1.default[language]
            : languagePack_1.default["default"]; // 语言包
    var contextValue = {
        form: form,
        customComponent: customComponent,
        customTableRender: customTableRender,
        language: language,
        languagePack: langP // 语言包
    };
    react_1.useImperativeHandle(ref, function () { return form; });
    react_1.useEffect(function () {
        var defaultValue = getObjectFromSchema_1.default(json);
        var obj = getObjectFromValue_1.default(schemaFormValue);
        form.resetFields();
        form.setFieldsValue(__assign(__assign({}, defaultValue), obj));
    }, [schemaFormValue]);
    return (React.createElement(context_1.default.Provider, { value: contextValue },
        React.createElement(antd_1.Form, __assign({ layout: "vertical", form: form }, formOptions),
            React.createElement(FormObject_1.default, { root: json, onOk: onOk, onCancel: onCancel, okText: okText, cancelText: cancelText, footer: footer }))));
});
SchemaForm.propTypes = {
    json: PropTypes.object.isRequired,
    value: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    okText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    cancelText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    footer: PropTypes.func,
    customComponent: PropTypes.objectOf(PropTypes.func),
    customTableRender: PropTypes.objectOf(PropTypes.func),
    languagePack: PropTypes.object
};
SchemaForm.defaultProps = {
    customComponent: {},
    customTableRender: {}
};
exports.default = SchemaForm;
