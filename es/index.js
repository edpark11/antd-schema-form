import * as React from 'react';
import { useState, useEffect, forwardRef } from 'react';
import SchemaForm from './SchemaForm';
import components from './customComponent';
import getKeysFromObject from './utils/getKeysFromObject';
import getObjectFromValue from './utils/getObjectFromValue';
import getValueFromObject from './utils/getValueFromObject';
export default forwardRef(function (props, ref) {
    const { customComponent, ...otherProps } = props;
    const [custom, setCustom] = useState(Object.assign(components, customComponent || {}));
    useEffect(function () {
        setCustom(Object.assign(components, customComponent || {}));
    }, [customComponent]);
    return React.createElement(SchemaForm, Object.assign({ ref: ref, customComponent: custom }, otherProps));
});
export { getKeysFromObject, getObjectFromValue, getValueFromObject };
