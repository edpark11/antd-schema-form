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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_1 = require("react");
var PropTypes = __importStar(require("prop-types"));
var antd_1 = require("antd");
var classnames_1 = __importDefault(require("classnames"));
var lodash_1 = require("lodash");
var context_1 = __importDefault(require("../../context"));
var styleName_1 = __importDefault(require("../../utils/styleName"));
var createElement_1 = __importDefault(require("../../utils/createElement"));
function FormBoolean(props) {
    var context = react_1.useContext(context_1.default);
    if (!('form' in context))
        return null; // 类型判断
    var form = context.form, customComponent = context.customComponent;
    var root = props.root, required = props.required;
    var id = root.id, title = root.title, description = root.description, $componentType = root.$componentType, $hidden = root.$hidden, $formItemProps = root.$formItemProps;
    var element = null;
    if (customComponent) {
        element = ($componentType && $componentType in customComponent)
            ? customComponent[$componentType](root, form, required)
            : createElement_1.default(customComponent.defaultBoolean, [root, form, required]);
    }
    return element ? (React.createElement(antd_1.Form.Item, __assign({ className: classnames_1.default($hidden ? styleName_1.default('hidden') : undefined, $formItemProps === null || $formItemProps === void 0 ? void 0 : $formItemProps.className), name: id, label: title, valuePropName: "checked" }, lodash_1.omit($formItemProps, ['className'])), element)) : null;
}
FormBoolean.propTypes = {
    root: PropTypes.object
};
exports.default = FormBoolean;
