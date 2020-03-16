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
var classnames_1 = require("classnames");
var antd_1 = require("antd");
var lodash_1 = require("lodash");
var context_1 = require("../../context");
var styleName_1 = require("../../utils/styleName");
var createArrayRules_1 = require("./createArrayRules");
var createElement_1 = require("../../utils/createElement");
function FormArray(props) {
    var _a;
    var context = react_1.useContext(context_1.default);
    if (!('form' in context))
        return null; // 类型判断
    var form = context.form, customComponent = context.customComponent, languagePack = context.languagePack;
    var root = props.root, required = props.required;
    var id = root.id, title = root.title, description = root.description, $componentType = root.$componentType, $defaultValue = root.$defaultValue, $hidden = root.$hidden, $formItemProps = root.$formItemProps;
    var rules = createArrayRules_1.default(languagePack, root, required);
    var isTableComponent = false; // 判断是否为table组件
    var element = null;
    if (customComponent) {
        if ($componentType && $componentType in customComponent) {
            element = customComponent[$componentType](root, form, required);
        }
        else {
            element = createElement_1.default(customComponent.defaultArray, [
                root,
                form,
                required
            ]);
            isTableComponent = true;
        }
    }
    var classname = classnames_1.default((_a = {},
        _a[styleName_1.default('array-table-form-item')] = isTableComponent,
        _a[styleName_1.default('hidden')] = $hidden,
        _a));
    if ($formItemProps && $formItemProps.className) {
        classname = classnames_1.default(classname, $formItemProps.className);
    }
    return element ? (React.createElement(antd_1.Form.Item, __assign({ className: classname, name: id, rules: rules, label: title }, lodash_1.omit($formItemProps, ['className'])), element)) : null;
}
FormArray.propTypes = {
    root: PropTypes.object,
    required: PropTypes.bool
};
exports.default = FormArray;
