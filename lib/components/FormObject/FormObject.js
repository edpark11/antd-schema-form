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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var PropTypes = require("prop-types");
var isArray_1 = require("lodash/isArray");
var antd_1 = require("antd");
var context_1 = require("../../context");
var styleName_1 = require("../../utils/styleName");
var FormString_1 = require("../FormString/FormString");
var FormNumber_1 = require("../FormNumber/FormNumber");
var FormBoolean_1 = require("../FormBoolean/FormBoolean");
var FormArray_1 = require("../FormArray/FormArray");
var getValueFromObject_1 = require("../../utils/getValueFromObject");
var getKeysFromObject_1 = require("../../utils/getKeysFromObject");
var createElement_1 = require("../../utils/createElement");
var sortProperties_1 = require("../../utils/sortProperties");
function FormObject(props) {
    var context = react_1.useContext(context_1.default);
    if (!('form' in context))
        return null; // 类型判断
    var form = context.form, customComponent = context.customComponent, languagePack = context.languagePack;
    var formObjectRoot = props.root, onOk = props.onOk, onCancel = props.onCancel, _a = props.okText, okText = _a === void 0 ? languagePack.formObject.okText : _a, _b = props.cancelText, cancelText = _b === void 0 ? languagePack.formObject.cancelText : _b, footer = props.footer;
    // 根据type渲染不同的组件
    function renderComponentByTypeView(root, required) {
        var id = root.id, type = root.type;
        var _required = !!required;
        var props = { key: id, root: root, required: _required };
        // 渲染oneOf
        if ('oneOf' in root && root.oneOf && isArray_1.default(root.oneOf) && root.oneOf.length > 0) {
            // eslint-disable-next-line no-use-before-define
            return renderOneOfComponentView(root, _required);
        }
        switch (type) {
            case 'string':
                return React.createElement(FormString_1.default, __assign({}, props));
            case 'integer':
            case 'number':
                return React.createElement(FormNumber_1.default, __assign({}, props));
            case 'boolean':
                return React.createElement(FormBoolean_1.default, __assign({}, props));
            case 'array':
                return React.createElement(FormArray_1.default, __assign({}, props));
            case 'object':
                // eslint-disable-next-line no-use-before-define
                return renderObjectComponentView(root);
            default:
                return null;
        }
    }
    // oneOf组件
    function renderOneOfComponentView(root, required) {
        var oneOf = root.oneOf, $oneOfComponentType = root.$oneOfComponentType;
        var element = [];
        (oneOf || []).forEach(function (value, index, array) {
            var childrenRoot = __assign({}, value);
            for (var key in root) {
                // children不继承oneOf相关的属性
                if (!(key in childrenRoot) && !['oneOf', '$oneOfDisabled', '$oneOfIndex', '$oneOfComponentType'].includes(key)) {
                    childrenRoot[key] = root[key];
                }
            }
            element.push(renderComponentByTypeView(childrenRoot, required));
        });
        var oneOfElement = null;
        if (customComponent) {
            oneOfElement = $oneOfComponentType && $oneOfComponentType in customComponent
                ? customComponent[$oneOfComponentType](root, form, element)
                : createElement_1.default(customComponent.defaultOneOf, [root, form, element]);
        }
        return oneOfElement;
    }
    // 渲染一个object组件
    function renderObjectComponentView(root) {
        var $componentType = root.$componentType;
        var required = root.required || [];
        var properties = sortProperties_1.default(root.properties || {});
        var element = [];
        // 判断object下组件的类型并渲染，只要有一个有值就要显示
        for (var key in properties) {
            element.push(renderComponentByTypeView(properties[key], required.includes(key)));
        }
        var objectElement = null;
        if (customComponent) {
            objectElement = ($componentType && $componentType in customComponent)
                ? customComponent[$componentType](root, form, element)
                : createElement_1.default(customComponent.defaultObject, [root, form, element]);
        }
        return objectElement;
    }
    // ok事件
    function handleOkClick(event) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var keys, formValue, value, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        keys = getKeysFromObject_1.default(formObjectRoot);
                        return [4 /*yield*/, form.validateFields(keys)];
                    case 1:
                        formValue = _c.sent();
                        value = getValueFromObject_1.default(formValue);
                        onOk && onOk(form, value, keys);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _c.sent();
                        console.error(err_1);
                        form.scrollToField((_b = (_a = err_1 === null || err_1 === void 0 ? void 0 : err_1.errorFields) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.name);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    // cancel事件
    function handleCancelClick(event) {
        onCancel && onCancel(form);
    }
    // 确认和取消按钮
    function footerView() {
        if (onOk || onCancel) {
            return (React.createElement("div", { className: styleName_1.default('object-click-button-box') },
                onOk
                    ? React.createElement(antd_1.Button, { type: "primary", onClick: handleOkClick }, okText)
                    : null,
                onCancel ? (React.createElement(antd_1.Button, { className: onOk ? styleName_1.default('object-cancel') : undefined, onClick: handleCancelClick }, cancelText)) : null));
        }
        else {
            return null;
        }
    }
    return (React.createElement(react_1.Fragment, null,
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
exports.default = FormObject;
