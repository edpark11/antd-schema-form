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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var SchemaForm_1 = require("./SchemaForm");
var customComponent_1 = require("./customComponent");
var getKeysFromObject_1 = require("./utils/getKeysFromObject");
exports.getKeysFromObject = getKeysFromObject_1.default;
var getObjectFromValue_1 = require("./utils/getObjectFromValue");
exports.getObjectFromValue = getObjectFromValue_1.default;
var getValueFromObject_1 = require("./utils/getValueFromObject");
exports.getValueFromObject = getValueFromObject_1.default;
exports.default = react_1.forwardRef(function (props, ref) {
    var customComponent = props.customComponent, otherProps = __rest(props, ["customComponent"]);
    var _a = react_1.useState(Object.assign(customComponent_1.default, customComponent || {})), custom = _a[0], setCustom = _a[1];
    react_1.useEffect(function () {
        setCustom(Object.assign(customComponent_1.default, customComponent || {}));
    }, [customComponent]);
    return React.createElement(SchemaForm_1.default, __assign({ ref: ref, customComponent: custom }, otherProps));
});
