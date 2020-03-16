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
var antd_1 = require("antd");
var classnames_1 = require("classnames");
var lodash_1 = require("lodash");
var context_1 = require("../../context");
var styleName_1 = require("../../utils/styleName");
var createStringRules_1 = require("./createStringRules");
var createElement_1 = require("../../utils/createElement");
function FormString(props) {
    var context = react_1.useContext(context_1.default);
    if (!('form' in context))
        return null; // 类型判断
    var form = context.form, customComponent = context.customComponent, languagePack = context.languagePack;
    var root = props.root, required = props.required; // type=object时，会判断key是否存在于required数组中
    var id = root.id, title = root.title, description = root.description, $componentType = root.$componentType, $hidden = root.$hidden, $formItemProps = root.$formItemProps;
    var rules = createStringRules_1.default(languagePack, root, required);
    var element = null;
    if (customComponent) {
        element = ($componentType && $componentType in customComponent)
            ? customComponent[$componentType](root, form, required)
            : createElement_1.default(customComponent.defaultString, [root, form, required]);
    }
    return element ? (React.createElement(antd_1.Form.Item, __assign({ className: classnames_1.default($hidden ? styleName_1.default('hidden') : undefined, $formItemProps === null || $formItemProps === void 0 ? void 0 : $formItemProps.className), name: id, rules: rules, label: title }, lodash_1.omit($formItemProps, ['className'])), element)) : null;
}
FormString.propTypes = {
    root: PropTypes.object,
    required: PropTypes.bool
};
exports.default = FormString;
