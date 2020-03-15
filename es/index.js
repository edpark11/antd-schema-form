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
import * as React from 'react';
import { useState, useEffect, forwardRef } from 'react';
import SchemaForm from './SchemaForm';
import components from './customComponent';
import getKeysFromObject from './utils/getKeysFromObject';
import getObjectFromValue from './utils/getObjectFromValue';
import getValueFromObject from './utils/getValueFromObject';
export default forwardRef(function (props, ref) {
    var customComponent = props.customComponent, otherProps = __rest(props, ["customComponent"]);
    var _a = useState(Object.assign(components, customComponent || {})), custom = _a[0], setCustom = _a[1];
    useEffect(function () {
        setCustom(Object.assign(components, customComponent || {}));
    }, [customComponent]);
    return React.createElement(SchemaForm, __assign({ ref: ref, customComponent: custom }, otherProps));
});
export { getKeysFromObject, getObjectFromValue, getValueFromObject };
